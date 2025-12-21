import Link from "next/link";
import { StudentForm } from "../_components/StudentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const NewStudentPage = () => {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/students"
          className={buttonVariants({ variant: "ghost" })}
        >
          <ArrowLeft className="size-4" />
          <span>Back to Students</span>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-xl text-center md:text-2xl font-bold">
              Create New Student
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <StudentForm type="create" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewStudentPage;
