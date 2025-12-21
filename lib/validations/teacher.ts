import { z } from "zod";

export const teacherFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().optional(),
  sex: z.string().min(2, "Sex must be at least 2 characters"),
  active: z.boolean().default(true),
});

export const teacherUpdateSchema = teacherFormSchema
  .omit({ password: true })
  .extend({
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
  });

export type TeacherFormValues = z.infer<typeof teacherFormSchema>;
