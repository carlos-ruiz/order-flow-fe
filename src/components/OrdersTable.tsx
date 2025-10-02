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
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  quantity: number;
}

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
  onDelete: (orderId: string) => void;
}

export function OrdersTable({
  orders,
  onStatusChange,
  onDelete,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
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
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{order.customer}</div>
                    <div className="text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
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
                          onStatusChange(order.id, "delivered");
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Marcar como Entregado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onStatusChange(order.id, "cancelled");
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
