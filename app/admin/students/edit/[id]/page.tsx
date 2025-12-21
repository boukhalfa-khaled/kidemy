import prisma from "@/lib/prisma";
import { StudentForm } from "../../_components/StudentForm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditStudentPage = async ({
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
    include: { student: true },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-center flex-col sm:flex-row gap-4 sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            Manage students, track statuses and remove when necessary
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-xl text-center md:text-2xl font-bold">
              Update Student
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <StudentForm user={user} type="create" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditStudentPage;
