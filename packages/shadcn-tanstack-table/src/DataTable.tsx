"use client";

/**
 * Generic data table rendering component, using TanStack Table.
 */

// External Modules ----------------------------------------------------------

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/shadcn-ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/shadcn-ui/components/tooltip";
import {
  flexRender,
  Row,
  Table as TanstackTable,
} from "@tanstack/react-table";
//import clsx from "clsx";
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUpAZ,
//  Pencil,
//  Plus,
//  Trash,
//  X,
} from "lucide-react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type TableAction<TData> = {
  // Optional icon for the action
  icon?: React.ReactNode;
  // Label for the action
  label: string;
  // Click handler for the action
  onClick: (row: Row<TData>) => void;
};

type DataTableProps<TData> = {
  // Optional actions rendered as a dropdown per-row
  actions?: TableAction<TData>[];
  // Show pagination controls [false]
  showPagination?: boolean;
  // The Tanstack Table we are displaying
  table: TanstackTable<TData>;
};

export function DataTable<TData>({
                                   showPagination,
                                   table,
                                   actions,
                                 }: DataTableProps<TData>) {
  // Pagination state
  const pageCount = table.getPageCount();
  const extraColumn = actions && actions.length > 0 ? 1 : 0;

  return (
    <Table className="border-4 rounded-md">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                <div className="flex flex-row w-full justify-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() ? (
                    <>
                      <span>&nbsp;</span>
                      <span
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: "pointer" }}
                      >
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUpAZ className="text-info" size={24} />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDownAZ className="text-info" size={24} />
                        ) : (
                          <ArrowDownUp className="text-info" size={24} />
                        )}
                      </span>
                    </>
                  ) : null}
                </div>
              </TableHead>
            ))}
            {actions && actions.length > 0 ? (
              <TableHead key={`${headerGroup.id}-actions`}>
                <div className="flex flex-row w-full justify-center">Actions</div>
              </TableHead>
            ) : null}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="odd:bg-muted/50 odd:hover:bg-muted/50"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
            {actions && actions.length > 0 ? (
              <TableCell key={`${row.id}-actions`} className="flex flex-row justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="px-2 py-1 rounded">
                      ...
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {actions.map((action, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        onClick={() => {
                          try {
                            action.onClick(row as Row<TData>);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {action.icon ? (
                          <span className="mr-2">{action.icon}</span>
                        ) : null}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>

      {showPagination ? (
        <TableFooter>
          <TableRow>
            <TableHead
              colSpan={table.getCenterLeafColumns().length + extraColumn}
            >
              <div className="text-center mt-2 flex flex-row justify-center items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => table.firstPage()}
                    >
                      <ArrowLeftToLine />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>First Page</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => table.previousPage()}
                    >
                      <ArrowLeft />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Previous Page</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled={!table.getCanNextPage()}
                      onClick={() => table.nextPage()}
                    >
                      <ArrowRight />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Next Page</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled={!table.getCanNextPage()}
                      onClick={() => table.lastPage()}
                    >
                      <ArrowRightToLine />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Last Page</TooltipContent>
                </Tooltip>
                <span className="p-4">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {pageCount > 0 ? pageCount : `1`}{" "}
                  | Total of {table.getRowCount().toLocaleString()} Rows
                </span>
              </div>
            </TableHead>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  );
}
