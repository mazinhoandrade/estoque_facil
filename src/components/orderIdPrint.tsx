"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
import { Order } from "@/src/types/order";

interface Props {
  order: Order;
}

export const OrderIdPrint = ({ order }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrint = () => {
    if (window.innerWidth < 2000) {
      // Abre em nova janela para mobile
      const printWindow = window.open("", "_blank");
      if (printWindow && printRef.current) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Comprovante de Venda</title>
              <style>
                body { font-family: Arial; padding: 10mm; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 4px; }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
              <script>
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 200);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      // Usa react-to-print para desktop
      // reactToPrint({
      //   content: () => printRef.current,
      //   // ... resto das configurações
      // });
    }
  };

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   contentRef: printRef,
  //   pageStyle: `
  //   @page {
  //     size: auto;
  //     margin: 5mm;
  //   }
  //   @media print {
  //     body {
  //       -webkit-print-color-adjust: exact;
  //       margin: 0;
  //       padding: 0;
  //       font-family: Arial, sans-serif;
  //     }
  //     .print-content {
  //       padding: 10mm;
  //     }
  //     .no-print {
  //       display: none !important;
  //     }
  //   }
  // `,
  //   documentTitle: `Venda_${order.id}_${formatDate(order.createdAt, "file")}`,
  //   onBeforeGetContent: () =>
  //     console.log("Preparando conteúdo para impressão..."),
  //   onAfterPrint: () => console.log("Impressão concluída!"),
  //   removeAfterPrint: true,
  // });

  if (!isMounted) {
    return <div className="p-6">Carregando comprovante...</div>;
  }

  return (
    <div className="p-6">
      {/* Conteúdo para impressão (renderizado apenas no cliente) */}
      <div className="hidden">
        <div ref={printRef} className="p-4 print:block print:bg-white">
          <style>{`
            @media print {
              .print-table {
                width: 100%;
                border-collapse: collapse;
              }
              .print-table th, .print-table td {
                padding: 4px;
                border: 1px solid #ddd;
              }
              .print-header {
                text-align: center;
                margin-bottom: 10px;
              }
              .print-footer {
                text-align: center;
                margin-top: 20px;
                font-size: 0.8rem;
              }
            }
          `}</style>

          <div className="print-header">
            <h1 className="text-xl font-bold">Comprovante de Venda</h1>
            <p className="text-sm">
              #{order.id} - {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="mb-4">
            <p>
              <strong>Cliente:</strong> {order.clientName}
            </p>
          </div>

          <table className="print-table">
            <thead>
              <tr>
                <th className="text-left">Produto</th>
                <th className="text-left">Preço</th>
                <th className="text-left">Qtd.</th>
                <th className="text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderProduct.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs">{item.product.code}</p>
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right font-bold">
            <p>Total: {formatCurrency(order.total)}</p>
          </div>

          <div className="print-footer">
            <p>Obrigado pela preferência!</p>
            <p>{formatDate(new Date(), "full")}</p>
          </div>
        </div>
      </div>

      {/* Conteúdo normal da página */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Venda #{order.id}</h1>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" className="no-print">
            Imprimir <p className="hidden md:inline">Comprovante</p>
          </Button>
          <Link href="/admin/venda">
            <Button variant="outline" className="no-print">
              Voltar
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Informações do Cliente</h3>
            <p>{order.clientName}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Resumo da Venda</h3>
            <p>Total: {formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderProduct.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">{item.product.code}</p>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {formatCurrency(item.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right">
        <div className="text-xl font-semibold">
          Total: {formatCurrency(order.total)}
        </div>
      </div>
    </div>
  );
};
