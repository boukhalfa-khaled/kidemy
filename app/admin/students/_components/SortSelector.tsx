"use client";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortDir = searchParams.get("sortDir") || "desc";

  const toggleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newSortDir = sortDir === "desc" ? "asc" : "desc";

    params.set("sortDir", newSortDir);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Button variant="outline" className="w-auto" onClick={toggleSort}>
      {sortDir === "asc" ? (
        <>
          <SortAsc className="w-4 h-4 mr-2" />
          Ascending
        </>
      ) : (
        <>
          <SortDesc className="w-4 h-4 mr-2" />
          Descending
        </>
      )}
    </Button>
  );
}
