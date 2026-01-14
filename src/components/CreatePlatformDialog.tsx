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
import { type Platform } from "./PlatformsTable";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar plataforma" : "Nueva plataforma"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza los detalles de la plataforma."
              : "Complete el siguiente formulario para crear una nueva plataforma."}
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
                placeholder="Nombre de la plataforma"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerFee" className="py-2">
                Comisión cobrada al cliente
              </Label>
              <Input
                id="customerFee"
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
              <Label htmlFor="sellerCommission" className="py-2">
                Comisión pagada al vendedor
              </Label>
              <Input
                id="sellerCommission"
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
                {isEditing ? "Guardar cambios" : "Crear plataforma"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
