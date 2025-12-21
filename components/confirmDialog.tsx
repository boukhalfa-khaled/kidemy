"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <DialogDescription>{description}</DialogDescription>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            No
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
