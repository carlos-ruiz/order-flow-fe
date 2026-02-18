import { useState, useEffect } from "react";
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
import { type Platform, type Status } from "../pages/Dashboard";

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateOrder: (order: Omit<Order, "id">) => void;
  platforms: Platform[];
  statuses: Status[];
}

export function CreateOrderDialog({
  open,
  onOpenChange,
  onCreateOrder,
  platforms,
  statuses,
}: CreateOrderDialogProps) {
  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().slice(0, 16), // ISO string for datetime-local
    totalAmount: "0",
    status: statuses[0]?.id || "",
    platform: platforms[0]?.id || "",
  });

  useEffect(() => {
    if (statuses.length > 0 && !formData.status) {
      setFormData((prev) => ({
        ...prev,
        status: statuses[0].id,
      }));
    }
    if (platforms.length > 0 && !formData.platform) {
      setFormData((prev) => ({
        ...prev,
        platform: platforms[0].id,
      }));
    }
  }, [statuses, platforms, formData.status, formData.platform]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onCreateOrder({
      dateTime: formData.dateTime,
      platformId: formData.platform,
      totalAmount: Number.parseFloat(formData.totalAmount) || 0,
      statusId: formData.status,
    });

    // Reset form
    setFormData({
      totalAmount: "0",
      status: statuses[0]?.id || "",
      dateTime: new Date().toISOString().slice(0, 16),
      platform: platforms[0]?.id || "",
    });

    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    console.log(`Changing ${field} to ${value}`);
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
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: string) => {
                    handleChange("status", value);
                  }}
                >
                  <SelectTrigger id="status">
                    <SelectValue>
                      {statuses.find((s) => s.id === formData.status)?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {statuses
                      .filter((s) => s.active)
                      .map((status) => (
                        <SelectItem key={status.id} value={status.id}>
                          {status.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="dateTime"
                  type="datetime"
                  value={formData.dateTime}
                  onChange={(e) => {
                    handleChange("dateTime", e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Plataforma</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value: string) => {
                    handleChange("platform", value);
                  }}
                >
                  <SelectTrigger id="platform">
                    <SelectValue>
                      {platforms.find((p) => p.id === formData.platform)
                        ?.name || "Selecciona una plataforma"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
