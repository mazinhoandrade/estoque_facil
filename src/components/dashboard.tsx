import { Product } from "@prisma/client";
import { ListCheck, TrendingUp } from "lucide-react"

import { Graphic } from "@/components/graphic";
import { Card } from "@/components/ui/card";
import prisma from '@/lib/prisma'

import { generateYearlySalesData } from "../lib/getData";
import { getTopProducts } from "../lib/orderProducts";


interface Props {
    Products: Product[]
}
export const Dashboard = async  ({Products}: Props) => {
  const salesData = await generateYearlySalesData()
  const orders = await prisma.order.findMany({
    include: {
      orderProduct: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
 
  const totalSales = orders.filter(order => order.createdAt >= new Date(new Date().setDate(new Date().getDate() - 30))).map(order => order.total).sort((a, b) => b - a).reduce((a, b) => a + b, 0) // total de vendas nos ultimos 30 dias

  
  return (
    <div className="mt-4 w-full px-2 space-y-2">
      <div className="grid-cols grid w-full gap-4 text-2xl text-white lg:grid-cols-2">
        <Card className="bg-primary py-5 text-center">{Products?.length} Produtos</Card>
        <Card className="bg-primary py-5 text-center">{totalSales} R$ <p className="text-xs">Total em vendas nos ultimos 30 dias</p></Card>
      </div>
      <div className="w-full">
          <h1 className="flex items-center">Grafico de vendas <TrendingUp /></h1>
          <Graphic chartData={salesData.monthlyData} />
      </div>
      <div className="grid-cols grid w-full gap-4 text-left text-xl lg:grid-cols-2">
        <div className="mt-4 space-y-1">
            <h1 className="flex items-center">Top 10 Produtos Mais Vendidos <ListCheck color={"green"} /></h1>
            {getTopProducts(orders).slice(0, 10).map((product) => (
              <Card key={product.productId} className="bg-primary py-2 text-center flex justify-between items-center text-white px-1 text-sm"><div>{product.name}</div><div className="text-xs">{product.quantity} unidades</div></Card>
            ))}
        </div>
        <div className="mt-4 space-y-1">
            <h1 className="flex items-center">Top 10 Produtos com estoque baixo <ListCheck color="red"  /></h1>
            {Products.filter((product) => product.quantity <= 4).slice(0, 10).map((product) => (
              <Card key={product.id} className="bg-primary py-2 text-center flex justify-between items-center text-white px-1 text-sm"><div>{product.name}</div><div className="text-xs">{product.quantity} unidades</div></Card>
            ))}
        </div>
      </div>
    </div>
  );
};
