import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { formatCurrency,formatDate } from '@/lib/utils'

export default async function OrderDetailPage({
  params
}: {
  params: { id: string }
}) {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(params.id)
    },
    include: {
      orderProduct: {
        include: {
          product: true
        }
      }
    }
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Venda #{order.id}</h1>
          <p className="text-sm text-gray-500">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <Link href="/sales">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium mb-2">Informações do Cliente</h3>
            <p>{order.clientName}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium mb-2">Resumo da Venda</h3>
            <p>Total: {formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
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
                <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
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
  )
}