"use server";

import bcrypt from "bcryptjs";
import {
  studentFormSchema,
  studentUpdateSchema,
} from "@/lib/validations/student";
import path from "path";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

async function saveAvatar(
  base64Image: string,
  firstName: string,
  lastName: string,
  oldImage?: string | null
) {
  if (!base64Image.startsWith("data:image")) return null;

  const match = base64Image.match(/^data:image\/(\w+);base64,/);
  const ext = match?.[1] ?? "png";

  const buffer = Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const uploadDir = path.join(process.cwd(), "public/uploads/avatars");
  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${firstName}-${lastName}.${ext}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  // delete old image
  if (oldImage) {
    try {
      await fs.unlink(path.join(process.cwd(), "public", oldImage));
    } catch {}
  }

  return `/uploads/avatars/${fileName}`;
}

export async function createStudent(formData: unknown) {
  const parsed = studentFormSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const data = parsed.data;

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const imageUrl = data.image
    ? await saveAvatar(data.image, data.firstName, data.lastName)
    : null;

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        sex: data.sex,
        active: data.active,
        role: "STUDENT",
        image: imageUrl,
      },
    });

    await tx.student.create({
      data: {
        userId: user.id,
        grade: data.grade,
        academicYear: data.academicYear,
      },
    });
  });

  revalidatePath("/dashboard/students");

  return { success: true };
}

// export async function updateStudent(userId: string, formData: unknown) {
//   const parsed = studentFormSchema.safeParse(formData);

//   if (!parsed.success) {
//     throw new Error("Invalid input");
//   }

//   const data = parsed.data;

//   const existingUser = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { image: true },
//   });

//   const imageUrl = data.image
//     ? await saveAvatar(
//         data.image,
//         data.firstName,
//         data.lastName,
//         existingUser?.image
//       )
//     : undefined;

//   const updateData: any = {
//     firstName: data.firstName,
//     lastName: data.lastName,
//     email: data.email,
//     sex: data.sex,
//     active: data.active,
//     role: "STUDENT",
//   };

//   if (data.password && data.password.length > 0) {
//     updateData.password = await bcrypt.hash(data.password, 10);
//   }

//   if (imageUrl) {
//     updateData.image = imageUrl;
//   }

//   await prisma.$transaction(async (tx) => {
//     const user = await tx.user.update({
//       where: { id: userId },
//       data: updateData,
//     });

//     await tx.student.update({
//       where: { userId: user.id },
//       data: {
//         grade: data.grade,
//         academicYear: data.academicYear,
//       },
//     });
//   });

//   revalidatePath("/dashboard/students");

//   return { success: true };
// }

export async function updateStudent(userId: string, formData: unknown) {
  const parsed = studentUpdateSchema.safeParse(formData);
  if (!parsed.success) throw new Error("Invalid input");

  const data = parsed.data;

  // Fetch existing user to get current avatar path
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { image: true },
  });

  // Save new avatar and delete old one if necessary
  const imageUrl = data.image
    ? await saveAvatar(
        data.image,
        data.firstName,
        data.lastName,
        existingUser?.image
      )
    : undefined;

  const updateData: any = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    sex: data.sex,
    active: data.active,
    role: "STUDENT",
  };

  if (data.password && data.password.length > 0) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  if (imageUrl) updateData.image = imageUrl;

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: updateData,
    });

    await tx.student.update({
      where: { userId: user.id },
      data: {
        grade: data.grade,
        academicYear: data.academicYear,
      },
    });
  });

  revalidatePath("/dashboard/students");
  return { success: true };
}
