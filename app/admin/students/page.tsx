import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Filter, Plus, User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import TableSkeleton from "./_components/TableSkeleton";
import StudentTable from "./_components/table";
import { SortSelector } from "./_components/SortSelector";
import { SearchInput } from "./_components/SearchInput";
import { StatusFilter } from "./_components/StatusFilter";

const studentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-center flex-col sm:flex-row gap-4 sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            Manage students, track statuses and remove when necessary
          </p>
        </div>
        <Link
          href="/admin/students/new"
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="size-4" />
          <span> Add New Student </span>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
          <CardDescription>
            Find students by name/email and filter by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchInput />
            <StatusFilter />
          </div>
        </CardContent>
      </Card>

      {/* Students Table Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              List of all students with their details and status
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <SortSelector />
            <div className="flex flex-row gap-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                students
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Suspense
            key={JSON.stringify(resolvedSearchParams)}
            fallback={<TableSkeleton />}
          >
            <StudentTable resolvedSearchParams={resolvedSearchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};
export default studentsPage;
