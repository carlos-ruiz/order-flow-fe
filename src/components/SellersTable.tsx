import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Check, X } from "lucide-react";

export interface Seller {
  id: number;
  name: string;
  lastName: string | null;
  address: string | null;
  phone: string;
  email: string | null;
  active: boolean;
}

export function SellersTable({
  sellers,
  onDelete,
  onUpdate,
}: {
  readonly sellers: Seller[];
  readonly onDelete?: (id: number) => void;
  readonly onUpdate?: (seller: Seller) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Activo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map((seller) => (
          <TableRow key={seller.id}>
            <TableCell>{seller.name}</TableCell>
            <TableCell>{seller.lastName}</TableCell>
            <TableCell>{seller.address}</TableCell>
            <TableCell>{seller.phone}</TableCell>
            <TableCell>{seller.email}</TableCell>
            <TableCell>
              {seller.active ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-800" />
              )}
            </TableCell>
            <TableCell className="flex justify-start gap-2">
              <Button onClick={() => onUpdate?.(seller)}>Editar</Button>
              <Button
                onClick={() => onDelete?.(seller.id)}
                variant="destructive"
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
