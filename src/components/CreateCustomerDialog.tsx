import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import type { Customer } from "./CustomersTable";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar cliente" : "Nuevo cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza los detalles del cliente."
              : "Complete el siguiente formulario para crear un nuevo cliente."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="py-2">
                Nombre
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                }}
                placeholder="Nombre del cliente"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="py-2">
                Apellido
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => {
                  handleChange("lastName", e.target.value);
                }}
                placeholder="Apellido del cliente"
              />
            </div>
            <div>
              <Label htmlFor="address" className="py-2">
                Dirección
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => {
                  handleChange("address", e.target.value);
                }}
                placeholder="Direccion del cliente"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="py-2">
                Teléfono
              </Label>
              <Input
                id="phone"
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
              <Label htmlFor="email" className="py-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
                placeholder="Correo electrónico del cliente"
              />
            </div>
            <div>
              <Label htmlFor="note" className="py-2">
                Nota
              </Label>
              <Input
                id="note"
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
                  checked={formData.active}
                  onCheckedChange={(checked) => {
                    handleChange("active", checked);
                  }}
                />
                <Label htmlFor="active">Activo</Label>
              </div>
            )}
          </div>
          <DialogFooter>
            <div className="flex justify-start gap-2">
              <Button
                type="button"
                variant="secondary"
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
