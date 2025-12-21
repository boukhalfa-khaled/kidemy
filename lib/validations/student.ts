import { z } from "zod";

export const studentFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().optional(),
  sex: z.string().min(2, "Sex must be at least 2 characters"),

  // Student specific fields
  grade: z.string().min(1, "Please select a grade"),
  academicYear: z.string().min(1, "Please select an academic year"),
  active: z.boolean().default(true),
});

// export const studentUpdateSchema = studentFormSchema.extend({
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .optional(),
// });

// export const studentUpdateSchema = studentFormSchema
//   .omit({ password: true }) // remove password
//   .extend({
//     password: z.string().min(6).optional(), // now optional
//   });
export const studentUpdateSchema = studentFormSchema
  .omit({ password: true })
  .extend({
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
  });

export type StudentFormValues = z.infer<typeof studentFormSchema>;
