"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import { Badge } from "./ui/badge";

const Transactions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Transactions</CardTitle>
        {/* <div className="relative flex-1">
          <div className="absolute left-2 top-2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by email"
            className="pl-8 pr-4 py-2 rounded-md w-full"
          />
        </div> */}
      </CardHeader>
      <CardContent>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-04-15</TableCell>
              <TableCell>
                <Link href="#" className="font-medium" prefetch={false}>
                  john@example.com
                </Link>
              </TableCell>
              <TableCell>$50.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-10</TableCell>
              <TableCell>
                <Link href="#" className="font-medium" prefetch={false}>
                  jane@example.com
                </Link>
              </TableCell>
              <TableCell>$25.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-04-05</TableCell>
              <TableCell>
                <Link href="#" className="font-medium" prefetch={false}>
                  bob@example.com
                </Link>
              </TableCell>
              <TableCell>$100.00</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
        <div className="flex gap-2 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>
          Under construction
        </div>
      </CardContent>
    </Card>
  );
};

export default Transactions;
