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
import type { Seller } from "./SellersTable";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar vendedor" : "Nuevo vendedor"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza los detalles del vendedor."
              : "Complete el siguiente formulario para crear un nuevo vendedor."}
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
                placeholder="Nombre del vendedor"
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
                placeholder="Apellido del vendedor"
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
                placeholder="Direccion del vendedor"
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
                placeholder="Teléfono del vendedor"
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
                placeholder="Correo electrónico del vendedor"
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
                {isEditing ? "Guardar cambios" : "Crear vendedor"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
