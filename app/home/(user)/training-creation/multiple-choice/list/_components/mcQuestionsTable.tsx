"use client";
import { McQuestion } from "@/app/lib/multiple-choice/types";
import React, { startTransition } from "react";
import {
  DataTable,
  ColumnDef,
  useColumnManagement,
} from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { deleteMcQuestionAction } from "@/app/lib/multiple-choice/server/server-actions";
import { toast } from "sonner";

interface McQuestionsTableProps {
  mcQuestions: McQuestion[];
}

const McQuestionsTable = ({ mcQuestions }: McQuestionsTableProps) => {
  const handleDelete = (questionId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteMcQuestionAction(questionId);
        if (result.success) {
          toast.success("Multiple choice question deleted successfully.");
          // Optionally refresh the page or update the questions list
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting MC question:", error);
        toast.error("Error deleting multiple choice question.");
      }
    });
  };

  const columnManagement = useColumnManagement({
    defaultVisibility: {
      /* your defaults */
    },
    defaultPinning: { left: ["question_text"], right: ["actions"] },
  });

  const columns: ColumnDef<McQuestion>[] = [
    {
      accessorKey: "question_text",
      header: "Question",
      cell: ({ row }) => {
        const questionText = row.getValue("question_text") as string;
        return (
          <div className="max-w-[400px] truncate" title={questionText}>
            {questionText}
          </div>
        );
      },
    },
    {
      accessorKey: "option_1",
      header: "Correct Answer",
      cell: ({ row }) => {
        const option1 = row.getValue("option_1") as string;
        return (
          <div className="max-w-[400px] truncate" title={option1}>
            {option1}
          </div>
        );
      },
    },

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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Link
              href={`/home/training-creation/multiple-choice/details/${row.original.id}`}
            >
              Details
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link
              href={`/home/training-creation/multiple-choice/edit/${row.original.id}`}
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
      data={mcQuestions}
      getRowId={(row) => row.id}
      pageSize={25}
      sticky
      forcePagination
      columnPinning={columnManagement.columnPinning}
      onColumnPinningChange={columnManagement.setColumnPinning}
    />
  );
};

export default McQuestionsTable;
