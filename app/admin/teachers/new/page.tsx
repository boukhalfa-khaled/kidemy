import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TeacherForm } from "../_components/TeacherForm";

const NewTeacherPage = () => {
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
              Create New Teacher
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <TeacherForm type="create" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewTeacherPage;
