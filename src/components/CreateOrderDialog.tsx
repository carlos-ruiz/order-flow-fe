import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { type Order } from "./OrdersTable";

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateOrder: (order: Omit<Order, "id">) => void;
}

export function CreateOrderDialog({
  open,
  onOpenChange,
  onCreateOrder,
}: CreateOrderDialogProps) {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    product: "",
    quantity: "1",
    amount: "",
    status: "pending" as Order["status"],
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onCreateOrder({
      customer: formData.customer,
      email: formData.email,
      product: formData.product,
      quantity: parseInt(formData.quantity),
      amount: parseFloat(formData.amount),
      status: formData.status,
      date: formData.date,
    });

    // Reset form
    setFormData({
      customer: "",
      email: "",
      product: "",
      quantity: "1",
      amount: "",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    });

    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nuevo pedido</DialogTitle>
          <DialogDescription>
            Complete el siguiente formulario para crear un nuevo pedido.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Nombre del cliente</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => {
                    handleChange("customer", e.target.value);
                  }}
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                  }}
                  placeholder="juanperez@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Producto</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => {
                  handleChange("product", e.target.value);
                }}
                placeholder="Nombre del producto"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => {
                    handleChange("quantity", e.target.value);
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Importe (por pieza) ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => {
                    handleChange("amount", e.target.value);
                  }}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: string) => {
                    handleChange("status", value);
                  }}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">En proceso</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    handleChange("date", e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear Pedido</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
