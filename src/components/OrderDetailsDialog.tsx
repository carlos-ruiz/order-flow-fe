import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import type { Order } from "./OrdersTable";

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: Readonly<OrderDetailsDialogProps>) {
  const getStatusColor = (status: Order["statusName"]) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View comprehensive information about this order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground mb-1">Order ID</p>
              <p>{order.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Status</p>
              <Badge className={getStatusColor(order.statusName)}>
                {order.statusName}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Plataforma</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-1">Plataforma</p>
                <p>{order.platformName}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Información de la Órden</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-1">Fecha</p>
                  <p>{order.dateTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Monto total</p>
                  <p>{order.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
