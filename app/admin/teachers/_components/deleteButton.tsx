"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirmDialog";
import { deleteTeacher } from "../actions";

export function DeleteTeacherButton({ teacherId }: { teacherId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteTeacher(teacherId);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Failed to delete teacher");
        console.error(error);
      } finally {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={isPending}
      >
        <Trash2 className="size-4 text-red-600" />
      </Button>

      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete Teacher"
        description="Are you sure you want to delete this teacher? This action cannot be undone."
      />
    </>
  );
}
