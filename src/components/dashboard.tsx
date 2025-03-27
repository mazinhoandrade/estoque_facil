import { ListCheck, TrendingUp } from "lucide-react"

import { Graphic } from "@/components/graphic";
import { Card } from "@/components/ui/card";

export const Dashboard = () => {
  return (
    <div className="mt-4 w-full px-2 space-y-2">
      <div className="grid-cols grid w-full gap-4 text-2xl text-white lg:grid-cols-2">
        <Card className="bg-primary py-5 text-center">9 produtos</Card>
        <Card className="bg-primary py-5 text-center">5 vendas</Card>
      </div>
      <div className="grid-cols grid w-full gap-4 text-left text-xl lg:grid-cols-2">
        <div className="mt-4">
            <h1 className="flex items-center">Top 10 Produtos Mais Vendidos <ListCheck color={"green"} /></h1>
            <Card className="bg-primary py-2 text-center flex justify-between text-white px-1 items-center"><div>bola</div><div className="text-xs">10 vendas</div></Card>
        </div>
        <div className="mt-4">
            <h1 className="flex items-center">Top 10 Produtos com estoque baixo <ListCheck color="red"  /></h1>
            <Card className="bg-primary py-2 text-center flex justify-between items-center text-white px-1"><div>bola</div><div className="text-xs">Resta 4 unidades</div></Card>
        </div>
      </div>
      <div className="w-full">
          <h1 className="flex items-center">Grafico de vendas <TrendingUp /></h1>
          <Graphic />
        </div>
    </div>
  );
};
