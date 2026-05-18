import { useState, useEffect } from "react";
import type { Customer } from "./CustomersTable";
import { Button, Modal, Switch, TextInput } from "@mantine/core";

interface CreateCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCustomer: (customer: Omit<Customer, "id"> | Customer) => void;
  customer?: Customer | null;
}

export function CreateCustomerDialog({
  open,
  onOpenChange,
  onCreateCustomer,
  customer,
}: Readonly<CreateCustomerDialogProps>) {
  const isEditing = !!customer;
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    note: "",
    active: true,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        lastName: customer.lastName || "",
        address: customer.address || "",
        phone: customer.phone,
        email: customer.email || "",
        note: customer.note || "",
        active: customer.active,
      });
    } else {
      setFormData({
        name: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        note: "",
        active: true,
      });
    }
  }, [customer, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      lastName: formData.lastName || null,
      address: formData.address || null,
      phone: formData.phone,
      email: formData.email || null,
      note: formData.note || null,
      active: formData.active,
    };

    if (isEditing) {
      onCreateCustomer({ ...payload, id: customer.id });
    } else {
      onCreateCustomer(payload);
    }

    setFormData({
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      note: "",
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
      title={isEditing ? "Editar cliente" : "Nuevo cliente"}
      size="xl"
    >
      <p className="mb-4 text-sm text-gray-600">
        {isEditing
          ? "Actualiza los detalles del cliente."
          : "Complete el siguiente formulario para crear un nuevo cliente."}
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
              placeholder="Nombre del cliente"
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
              placeholder="Apellido del cliente"
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
              placeholder="Direccion del cliente"
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
              placeholder="Teléfono del cliente"
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
              placeholder="Correo electrónico del cliente"
            />
          </div>
          <div>
            <TextInput
              id="note"
              label="Nota"
              type="text"
              value={formData.note}
              onChange={(e) => {
                handleChange("note", e.target.value);
              }}
              placeholder="Nota sobre el cliente"
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
            {isEditing ? "Guardar cambios" : "Crear cliente"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
