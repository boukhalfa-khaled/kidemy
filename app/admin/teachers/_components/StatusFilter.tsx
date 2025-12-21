"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      value={searchParams.get("status") || "all"}
      onValueChange={handleStatusChange}
    >
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}
