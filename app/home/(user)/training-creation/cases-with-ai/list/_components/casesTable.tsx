"use client";
import { Case } from "@/app/lib/cases/types";
import React, { startTransition } from "react";
import {
  DataTable,
  ColumnDef,
  useColumnManagement,
} from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { deleteCaseAction } from "@/app/lib/cases/server/server-actions";
import { toast } from "sonner";

interface CasesTableProps {
  cases: Case[];
}
const CasesTable = ({ cases }: CasesTableProps) => {
  const handleDelete = (caseId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteCaseAction(caseId);
        if (result.success) {
          toast.success("Case deleted successfully.");
          // Optionally refresh the page or update the cases list
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting case:", error);
        toast.error("Error deleting case.");
      }
    });
  };

  const columnManagement = useColumnManagement({
    defaultVisibility: {
      /* your defaults */
    },
    defaultPinning: { left: ["title"], right: ["actions"] },
  });

  const columns: ColumnDef<Case>[] = [
    // // Selection column - always pinned left
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //     />
    //   ),
    //   enableSorting: false,
    //   size: 40,
    // },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "problem_description",
      header: "Problem",
      cell: ({ row }) => {
        const description = row.getValue("problem_description") as string;
        return (
          <div className="max-w-[400px] truncate" title={description}>
            {description}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "solution",
    //   header: "Solution",
    //   cell: ({ row }) => {
    //     const solution = row.getValue("solution") as string;
    //     return (
    //       <div className="max-w-[200px] truncate" title={solution}>
    //         {solution}
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "product_type",
      header: "Product Type",
      cell: ({ row }) => {
        const type = row.getValue("product_type") as string;
        return (
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "platform_type",
      header: "Platform Type",
      cell: ({ row }) => {
        const type = row.getValue("platform_type") as string;
        return (
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {tags?.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags?.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Link
              href={`/home/training-creation/cases-with-ai/details/${row.original.id}`}
            >
              Details
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link
              href={`/home/training-creation/cases-with-ai/edit/${row.original.id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 80,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={cases}
      getRowId={(row) => row.id}
      pageSize={25}
      sticky
      forcePagination
      columnPinning={columnManagement.columnPinning}
      onColumnPinningChange={columnManagement.setColumnPinning}
    />
  );
};

export default CasesTable;
