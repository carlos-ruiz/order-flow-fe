import { Card } from "./ui/card";
import { Package, DollarSign, Clock, CheckCircle } from "lucide-react";

interface OrderStatsProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    processingOrders: number;
    completedOrders: number;
  };
}

export function OrderStats({ stats }: Readonly<OrderStatsProps>) {
  const statCards = [
    {
      title: "Total de Pedidos",
      value: stats.totalOrders,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Ingresos Totales",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "En proceso",
      value: stats.processingOrders,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completadas",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">{stat.title}</p>
              <h3>{stat.value}</h3>
            </div>
            <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
