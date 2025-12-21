import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Pen, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { Prisma } from "@/lib/generated/prisma/client";
import { Pagination } from "./Pagination";
import { DeleteStudentButton } from "./deleteButton";

function validateSearchParams(searchParams: {
  [key: string]: string | undefined;
}) {
  const page = searchParams.page
    ? Math.max(1, parseInt(searchParams.page)) || 1
    : 1;
  const search = searchParams.search || "";
  const status = searchParams.status || "";
  const sortDir = searchParams.sortDir === "asc" ? "asc" : "desc";

  return { page, search, status, sortDir };
}

const StudentTable = async ({ resolvedSearchParams }) => {
  const {
    page: currentPage,
    search: searchTerm,
    status,
    sortDir,
  } = validateSearchParams(resolvedSearchParams);

  const query: Prisma.UserWhereInput = {
    role: "STUDENT",
  };

  if (searchTerm) {
    query.OR = [
      { firstName: { contains: searchTerm, mode: "insensitive" } },
      { lastName: { contains: searchTerm, mode: "insensitive" } },
      { email: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  if (status === "active") {
    query.active = true;
  } else if (status === "inactive") {
    query.active = false;
  }

  const orderBy: Prisma.UserOrderByWithRelationInput =
    sortDir === "asc" ? { createdAt: "asc" } : { createdAt: "desc" };

  const [data, count] = await Promise.all([
    prisma.user.findMany({
      where: query,
      include: {
        student: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1),
      orderBy,
    }),
    prisma.user.count({
      where: query,
    }),
  ]);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <>
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Sex</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.firstName?.substring(0, 2).toUpperCase() || "U"}
                  />
                  <AvatarFallback className="bg-orange-500">
                    {user.firstName?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {user.lastName}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {user.firstName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.sex}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "capitalize",
                    user.active
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  )}
                >
                  {user.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/admin/students/${user.id}`}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <Eye className="size-4" />
                    <span>View</span>
                  </Link>
                  <Link
                    href={`/admin/students/edit/${user.id}`}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <Pen className="size-4" />
                    <span>Edit</span>
                  </Link>
                  <DeleteStudentButton studentId={user.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={count}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
};

export default StudentTable;
