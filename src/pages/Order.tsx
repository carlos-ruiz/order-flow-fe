import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiUrl } from "../config/api";
import type { Order } from "../components/OrdersTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Órden de {order?.platformName || "N/A"} del dia {date}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID de Producto</TableHead>
            <TableHead>Nombre del Producto</TableHead>
            <TableHead>Nombre del Cliente</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio Unitario</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price.toFixed(2)}</TableCell>
              <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
