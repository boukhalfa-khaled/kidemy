import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TeacherForm } from "../../_components/TeacherForm";

const EditTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log("ID received:", id); // Debug

  if (!id) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { teacher: true },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/teachers"
          className={buttonVariants({ variant: "ghost" })}
        >
          <ArrowLeft className="size-4" />
          <span>Back to Teachers</span>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-xl text-center md:text-2xl font-bold">
              Update Teacher
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <TeacherForm user={user} type="update" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditTeacherPage;
