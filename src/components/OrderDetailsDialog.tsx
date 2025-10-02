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
}: OrderDetailsDialogProps) {
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
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Customer Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-1">Name</p>
                <p>{order.customer}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Email</p>
                <p>{order.email}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Order Information</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-1">Product</p>
                  <p>{order.product}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Quantity</p>
                  <p>{order.quantity}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-1">Order Date</p>
                  <p>{order.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Amount</p>
                  <p>${order.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
