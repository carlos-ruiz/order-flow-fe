import { type Platform } from "./PlatformsTable";
import { useState, useEffect } from "react";
import { Button, Modal, Switch, TextInput } from "@mantine/core";

interface CreatePlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePlatform: (platform: Omit<Platform, "id"> | Platform) => void;
  platform?: Platform | null;
}

export function CreatePlatformDialog({
  open,
  onOpenChange,
  onCreatePlatform,
  platform,
}: Readonly<CreatePlatformDialogProps>) {
  const isEditing = !!platform;
  const [formData, setFormData] = useState({
    name: "",
    customerFee: "",
    sellerCommission: "",
    active: true,
  });

  useEffect(() => {
    if (platform) {
      setFormData({
        name: platform.name,
        customerFee: String(platform.customerFee),
        sellerCommission: String(platform.sellerCommission),
        active: platform.active,
      });
    } else {
      setFormData({
        name: "",
        customerFee: "",
        sellerCommission: "",
        active: true,
      });
    }
  }, [platform, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      customerFee: Number(formData.customerFee) || 0,
      sellerCommission: Number(formData.sellerCommission) || 0,
      active: formData.active,
    };

    if (isEditing) {
      onCreatePlatform({ ...payload, id: platform.id });
    } else {
      onCreatePlatform(payload);
    }

    setFormData({
      name: "",
      customerFee: "",
      sellerCommission: "",
      active: true,
    });

    onOpenChange(false);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      opened={open}
      onClose={() => {
        onOpenChange(false);
      }}
      title={isEditing ? "Editar plataforma" : "Nueva plataforma"}
      size="xl"
    >
      <p className="mb-4 text-sm text-gray-600">
        {isEditing
          ? "Actualiza los detalles de la plataforma."
          : "Complete el siguiente formulario para crear una nueva plataforma."}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TextInput
              id="name"
              label="Nombre"
              value={formData.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
              placeholder="Nombre de la plataforma"
              required
            />
          </div>
          <div>
            <TextInput
              id="customerFee"
              label="Comisión cobrada al cliente"
              type="number"
              step="0.01"
              value={formData.customerFee}
              onChange={(e) => {
                handleChange("customerFee", e.target.value);
              }}
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <TextInput
              id="sellerCommission"
              label="Comisión pagada al vendedor"
              type="number"
              step="0.01"
              value={formData.sellerCommission}
              onChange={(e) => {
                handleChange("sellerCommission", e.target.value);
              }}
              placeholder="0.00"
              required
            />
          </div>
          {isEditing && (
            <div className="flex items-center gap-2">
              <Switch
                id="active"
                label="Activo"
                checked={formData.active}
                onChange={(event) => {
                  handleChange("active", event.currentTarget.checked);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-start gap-2">
          <Button
            type="button"
            variant="default"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? "Guardar cambios" : "Crear plataforma"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
