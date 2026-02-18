import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

export interface Order {
  id?: string;
  platformId?: string;
  platformName?: string;
  statusId: string;
  statusName?: string;
  dateTime: string;
  totalAmount: number;
}

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (
    orderId: string | undefined,
    newStatus: Order["statusName"],
  ) => void;
  onDelete: (orderId: string | undefined) => void;
}

export function OrdersTable({
  orders,
  onStatusChange,
  onDelete,
}: Readonly<OrdersTableProps>) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getStatusColor = (status: Order["statusName"]) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "completed":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "canceled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID de Pedido</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Monto Total</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.platformName || "N/A"}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.statusName)}>
                    {order.statusName || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>{order.dateTime}</TableCell>
                <TableCell className="text-right">
                  {order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          handleViewDetails(order);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onStatusChange(order.id, "completed");
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Marcar como completado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onStatusChange(order.id, "canceled");
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Cancelar Pedido
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onDelete(order.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar Pedido
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </>
  );
}
