import { Card } from "@/components/ui/card";

export const Dashboard = () => {
  return (
    <Card className="mt-4 w-full px-2">
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="text-center text-2xl">9 produtos</div>
        <div className="text-center text-2xl">5 vendas</div>
      </div>
      <div className="mt-4 text-center text-2xl">produtos mais vendidos</div>
    </Card>
  );
};
