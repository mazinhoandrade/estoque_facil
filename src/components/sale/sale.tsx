"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ContentHeader } from "@/src/components/contentHeader";
import { DeleteButton } from "@/src/components/deleteButton";
import { Order } from "@/src/types/order";
interface Props {
  orders: Order[];
}

export const Sale = ({ orders }: Props) => {
  return (
    <div className="p-6">
      <ContentHeader label="venda" />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.clientName}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.orderProduct.length} itens</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <Link href={`/admin/venda/${order.id}`}>
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteButton name="venda" onClick={() => {}} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
