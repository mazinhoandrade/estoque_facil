"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", vendas: 2, total:200  },
  { month: "February", vendas: 10, total:150  },
  { month: "March", vendas: 20 , total:100 },
  { month: "April", vendas: 10, total:100 },
  { month: "May", vendas: 15 , total:100 },
  { month: "June", vendas: 10 , total:100 },
  { month: "July", vendas: 15 , total:100 },
  { month: "August", vendas: 10 , total:100 },
  { month: "September", vendas: 10 , total:100 },
  { month: "October", vendas: 20 , total:100 },
  { month: "November", vendas: 50 , total:100 },
  { month: "December", vendas: 30 , total:100 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface Props {
  chartData: any[]
}

export function Graphic({chartData}: Props) {

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tota de vendas</CardTitle>
        <CardDescription>2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="vendas" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="total" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
        Mostrando o total de vendas dos últimos 12 meses       
        </div>
      </CardFooter>
    </Card>
  )
}
