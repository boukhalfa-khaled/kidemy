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
import { SortSelector } from "./_components/SortSelector";
import { SearchInput } from "./_components/SearchInput";
import { StatusFilter } from "./_components/StatusFilter";
import TeacherTable from "./_components/table";

const teachersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center flex-col sm:flex-row gap-4 sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Management</h1>
          <p className="text-muted-foreground">
            Manage teachers, track statuses and remove when necessary
          </p>
        </div>
        <Link
          href="/admin/teachers/new"
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="size-4" />
          <span> Add New Teacher </span>
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
            Find teachers by name/email and filter by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchInput />
            <StatusFilter />
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>
              List of all teachers with their details and status
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <SortSelector />
            <div className="flex flex-row gap-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                teachers
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Suspense
            key={JSON.stringify(resolvedSearchParams)}
            fallback={<TableSkeleton />}
          >
            <TeacherTable resolvedSearchParams={resolvedSearchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};
export default teachersPage;
