import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiUrl } from "../config/api";
import type { Order } from "../components/OrdersTable";
import { Paper, Table, Text, Title } from "@mantine/core";

export default function Order() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Here you would typically fetch the order details using the ID
    // For example:
    // fetchOrderDetails(id);
    if (id) {
      fetch(`${getApiUrl("orders")}/${id}`)
        .then((res) => res.json())
        .then((data: Order) => {
          console.log("Order details:", data);
          setOrder(data);
          const formattedDate = new Date(data.dateTime).toLocaleDateString(
            "es-ES",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            },
          );
          setDate(formattedDate);
        })
        .catch((err: unknown) => {
          console.error("Error fetching order details:", err);
        });
    }
  }, [id]);

  return (
    <div className="space-y-4">
      <div>
        <Title order={2}>Orden de {order?.platformName || "N/A"}</Title>
        <Text c="dimmed">Fecha: {date || "N/A"}</Text>
      </div>
      <Paper withBorder radius="md" p="md">
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID de Producto</Table.Th>
              <Table.Th>Nombre del Producto</Table.Th>
              <Table.Th>Nombre del Cliente</Table.Th>
              <Table.Th>Cantidad</Table.Th>
              <Table.Th>Precio Unitario</Table.Th>
              <Table.Th>Subtotal</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {order?.items.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.id}</Table.Td>
                <Table.Td>{item.product}</Table.Td>
                <Table.Td>{item.customerName}</Table.Td>
                <Table.Td>{item.quantity}</Table.Td>
                <Table.Td>{item.price.toFixed(2)}</Table.Td>
                <Table.Td>{(item.price * item.quantity).toFixed(2)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </div>
  );
}
