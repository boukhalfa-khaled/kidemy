import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Mail,
  User,
  GraduationCap,
  UserCircle,
  Edit,
  ArrowLeft,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      teacher: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!user || user.role !== "TEACHER") {
    return <div>Teacher not found</div>;
  }

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/teachers"
          className={buttonVariants({ variant: "ghost" })}
        >
          <ArrowLeft className="size-4" />
          <span>Back to Teachers</span>
        </Link>
        <Link
          href={`/admin/teachers/edit/${user.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          <Edit className="size-4" />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.image || ""}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback className="bg-orange-500 text-2xl text-white">
                {user.firstName?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge
                  className={cn(
                    "capitalize",
                    user.active
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {user.active ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {user.role.toLowerCase()}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic details about the Teacher</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem
              icon={UserCircle}
              label="Full Name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <Separator />
            <InfoItem icon={Mail} label="Email Address" value={user.email} />
            <Separator />
            <InfoItem
              icon={User}
              label="Gender"
              value={user.sex.toLowerCase()}
            />
            <Separator />
            <InfoItem
              icon={Calendar}
              label="Member Since"
              value={new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          </CardContent>
        </Card>

        {/* Academic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Information
            </CardTitle>
            <CardDescription>Teacher academic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem
              icon={Calendar}
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  </div>
);
