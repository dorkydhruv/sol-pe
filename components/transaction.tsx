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
        <CardTitle>Transactions</CardTitle>
        <div className="relative flex-1">
          <div className="absolute left-2 top-2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by email"
            className="pl-8 pr-4 py-2 rounded-md w-full"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
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
        </Table>
      </CardContent>
    </Card>
  );
};

export default Transactions;
