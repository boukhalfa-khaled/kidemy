"use client";

import { Prisma } from "@/lib/generated/prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  teacherFormSchema,
  TeacherFormValues,
  teacherUpdateSchema,
} from "@/lib/validations/teacher";
import { createTeacher, updateTeacher } from "../actions";

interface TeacherFormProps {
  type: "create" | "update";
  user: Prisma.UserGetPayload<{
    include: { teacher: true };
  }>;
}

const academicYears = ["2023-2024", "2024-2025", "2025-2026"];

const grades = [
  "First year",
  "Second Year",
  "third Year",
  "Fourth Year",
  "Fifth Year",
];

export function TeacherForm({ type, user }: TeacherFormProps) {
  const [avatarPreview, setAvatarPreview] = useState(user?.image || "");

  const isUpdate = type === "update";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const schema = isUpdate ? teacherUpdateSchema : teacherFormSchema;

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sex: "MALE",
      active: false,
      image: "",
      ...(isUpdate && user
        ? {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email ?? "",
            sex: user.sex ?? "MALE",
            active: user.active ?? false,
            image: user.image ?? "",
          }
        : null),
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        form.setValue("image", result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        if (isUpdate && user.id) {
          await updateTeacher(user.id, data);
          console.log("teacherId", user.id);
          toast.success("Teacher updated successfully!");
          return router.back();
        } else {
          await createTeacher(data);
          toast.success("Teacher created successfully!");
          // router.refresh();
          form.reset();
          setAvatarPreview("");
        }
      } catch (error) {
        const action = isUpdate ? "update" : "create";
        toast.error(`Failed to ${action} teacher`);
        console.error(error);
      }
      // router.refresh();
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 ">
        {/* ========= avatar upload START =========  */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarPreview} />
            <AvatarFallback className="text-lg">
              {getInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Avatar
            </Button>
          </div>
        </div>
        {/* ========= avatar upload END  =========  */}

        {/* ====== Personal Information START  ======== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password {isUpdate ? "(leave empty to keep current)" : "*"}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={isUpdate ? "" : "••••••"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========= Personal Information END ========= */}

        {/* ========= Gender Selection START  =========  */}
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MALE" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="FEMALE" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========= Gender Selection END  =========  */}

        {/* ========= Academic Information START  =========  */}
        {/* ========= Academic Information END  =========  */}

        {/* ========= Status START  =========  */}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Active teachers can access the system
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* ========= Status END  =========  */}

        {/* ========= Submit Button =========  */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                {isUpdate ? "Updating..." : "Creating..."}
              </>
            ) : isUpdate ? (
              "Update Teacher"
            ) : (
              "Create Teacher"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
