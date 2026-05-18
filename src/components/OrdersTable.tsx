import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Badge, Menu, Table } from "@mantine/core";

interface OrderItem {
  id: string;
  customerName: string;
  price: number;
  quantity: number;
  sellerName: string;
  statusId: string;
  taxAmount: number;
  product: string;
}

export interface Order {
  id?: string;
  platformId?: string;
  platformName?: string;
  statusId: string;
  statusName?: string;
  dateTime: string;
  totalAmount: number;
  items: OrderItem[];
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
  const navigate = useNavigate();

  const getStatusColor = (status: Order["statusName"]) => {
    switch (status) {
      case "processing":
        return "blue";
      case "completed":
        return "violet";
      case "canceled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID de Pedido</Table.Th>
              <Table.Th>Plataforma</Table.Th>
              <Table.Th>Estatus</Table.Th>
              <Table.Th>Fecha</Table.Th>
              <Table.Th className="text-right">Monto Total</Table.Th>
              <Table.Th className="text-right">Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr key={order.id}>
                <Table.Td>{order.id}</Table.Td>
                <Table.Td>{order.platformName || "N/A"}</Table.Td>
                <Table.Td>
                  <Badge
                    color={getStatusColor(order.statusName)}
                    variant="light"
                  >
                    {order.statusName || "N/A"}
                  </Badge>
                </Table.Td>
                <Table.Td>{order.dateTime}</Table.Td>
                <Table.Td className="text-right">
                  {order.totalAmount.toFixed(2)}
                </Table.Td>
                <Table.Td className="text-right">
                  <Menu shadow="md" width={220} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" aria-label="Acciones">
                        <MoreHorizontal className="h-4 w-4" />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<Eye className="h-4 w-4" />}
                        onClick={() => {
                          if (order.id) {
                            void navigate(`/orders/${order.id}`);
                          }
                        }}
                      >
                        Ver Detalles
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<Edit className="h-4 w-4" />}
                        onClick={() => {
                          onStatusChange(order.id, "completed");
                        }}
                      >
                        Marcar como completado
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<Edit className="h-4 w-4" />}
                        onClick={() => {
                          onStatusChange(order.id, "canceled");
                        }}
                      >
                        Cancelar Pedido
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<Trash2 className="h-4 w-4" />}
                        onClick={() => {
                          onDelete(order.id);
                        }}
                      >
                        Eliminar Pedido
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}
