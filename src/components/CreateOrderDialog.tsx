import { useState, useEffect } from "react";
import { type Order } from "./OrdersTable";
import { type Platform, type Status } from "../pages/Dashboard";
import { Button, Modal, Select, TextInput } from "@mantine/core";

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
}: Readonly<CreateOrderDialogProps>) {
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
      items: [],
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
    <Modal
      opened={open}
      onClose={() => {
        onOpenChange(false);
      }}
      title="Nuevo pedido"
      size="xl"
    >
      <p className="mb-4 text-sm text-gray-600">
        Complete el siguiente formulario para crear un nuevo pedido.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Select
                label="Estado"
                value={formData.status}
                onChange={(value) => {
                  handleChange("status", value ?? "");
                }}
                data={statuses
                  .filter((s) => s.active)
                  .map((status) => ({
                    value: status.id,
                    label: status.name,
                  }))}
              />
            </div>
            <div className="space-y-2">
              <TextInput
                id="dateTime"
                label="Fecha"
                type="datetime-local"
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
              <Select
                label="Plataforma"
                value={formData.platform}
                onChange={(value) => {
                  handleChange("platform", value ?? "");
                }}
                placeholder="Selecciona una plataforma"
                data={platforms.map((platform) => ({
                  value: platform.id,
                  label: platform.name,
                }))}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="default"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">Crear Pedido</Button>
        </div>
      </form>
    </Modal>
  );
}
