"use client";

import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import { Input } from "./input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentItems, setCurrentItems] = useState<TData[]>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = Math.min(currentPage * itemsPerPage, data.length);
    setCurrentItems(data.slice(firstItemIndex, lastItemIndex));
  }, [data, currentPage, itemsPerPage]);

  // Filter data based on search query
  useEffect(() => {
    const filteredData = data.filter((item: any) =>
      item[filterKey].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentItems(filteredData.slice(0, itemsPerPage));
    setCurrentPage(1); // Reset page to 1 when search query changes
  }, [data, filterKey, itemsPerPage, searchQuery]);

  const table = useReactTable({
    data: currentItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          id="search"
          name="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="max-w-sm dark:border-blue-950 focus:dark:border-blue-950/40"
        />
      </div>
      <div className="rounded-md border dark:border-blue-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:border-blue-950">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-brand-blue dark:border-blue-950"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:border-blue-950/60"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`whitespace-pre-wrap leading-loose ${
                        // @ts-ignore
                        row.original.status === "Unchecked"
                          ? "font-semibold"
                          : "dark:text-neutral-300"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationSection
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: any;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to generate an array of page numbers with ellipsis
  const generatePages = () => {
    const pages = [];
    const totalPagesToShow = 6;
    const ellipsisThreshold = 4; // Number of pages before and after the ellipsis

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startIndex =
        currentPage <= totalPagesToShow - ellipsisThreshold
          ? 1
          : Math.min(
              currentPage - ellipsisThreshold,
              totalPages - totalPagesToShow
            ) + 1;
      const endIndex =
        currentPage >= totalPages - ellipsisThreshold
          ? totalPages
          : Math.max(currentPage + ellipsisThreshold, totalPagesToShow);

      for (let i = startIndex; i <= endIndex; i++) {
        pages.push(i);
      }

      if (endIndex < totalPages) {
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePreviousPage()}
            className="cursor-pointer"
          />
        </PaginationItem>
        {generatePages().map((page, idx) => (
          <PaginationItem
            key={idx}
            className={
              currentPage === page
                ? "rounded-md bg-background border-[1px] dark:border-blue-950"
                : ""
            }
          >
            {page === "ellipsis" ? (
              <PaginationLink>
                <PaginationEllipsis />
              </PaginationLink>
            ) : (
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => handleNextPage()}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
