import type { Order } from "./OrdersTable";
import { Badge, Divider, Modal } from "@mantine/core";

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
        return "yellow";
      case "processing":
        return "blue";
      case "shipped":
        return "violet";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Modal
      opened={open}
      onClose={() => {
        onOpenChange(false);
      }}
      title="Order Details"
      size="xl"
    >
      <p className="mb-4 text-sm text-gray-600">
        View comprehensive information about this order.
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground mb-1">Order ID</p>
            <p>{order.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Status</p>
            <Badge color={getStatusColor(order.statusName)} variant="light">
              {order.statusName}
            </Badge>
          </div>
        </div>

        <Divider />

        <div>
          <h4 className="mb-3">Plataforma</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground mb-1">Plataforma</p>
              <p>{order.platformName}</p>
            </div>
          </div>
        </div>

        <Divider />

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
    </Modal>
  );
}
