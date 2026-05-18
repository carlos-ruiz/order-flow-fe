import { useState, useEffect } from "react";
import type { Seller } from "./SellersTable";
import { Button, Modal, Switch, TextInput } from "@mantine/core";

interface CreateSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSeller: (seller: Omit<Seller, "id"> | Seller) => void;
  seller?: Seller | null;
}

export function CreateSellerDialog({
  open,
  onOpenChange,
  onCreateSeller,
  seller,
}: Readonly<CreateSellerDialogProps>) {
  const isEditing = !!seller;
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    active: true,
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name,
        lastName: seller.lastName || "",
        address: seller.address || "",
        phone: seller.phone,
        email: seller.email || "",
        active: seller.active,
      });
    } else {
      setFormData({
        name: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        active: true,
      });
    }
  }, [seller, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      lastName: formData.lastName || null,
      address: formData.address || null,
      phone: formData.phone,
      email: formData.email || null,
      active: formData.active,
    };

    if (isEditing) {
      onCreateSeller({ ...payload, id: seller.id });
    } else {
      onCreateSeller(payload);
    }

    setFormData({
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
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
      title={isEditing ? "Editar vendedor" : "Nuevo vendedor"}
      size="xl"
    >
      <p className="mb-4 text-sm text-gray-600">
        {isEditing
          ? "Actualiza los detalles del vendedor."
          : "Complete el siguiente formulario para crear un nuevo vendedor."}
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
              placeholder="Nombre del vendedor"
              required
            />
          </div>
          <div>
            <TextInput
              id="lastName"
              label="Apellido"
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                handleChange("lastName", e.target.value);
              }}
              placeholder="Apellido del vendedor"
            />
          </div>
          <div>
            <TextInput
              id="address"
              label="Dirección"
              type="text"
              value={formData.address}
              onChange={(e) => {
                handleChange("address", e.target.value);
              }}
              placeholder="Direccion del vendedor"
            />
          </div>
          <div>
            <TextInput
              id="phone"
              label="Teléfono"
              type="text"
              value={formData.phone}
              onChange={(e) => {
                handleChange("phone", e.target.value);
              }}
              placeholder="Teléfono del vendedor"
              required
            />
          </div>
          <div>
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
              placeholder="Correo electrónico del vendedor"
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
            {isEditing ? "Guardar cambios" : "Crear vendedor"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
