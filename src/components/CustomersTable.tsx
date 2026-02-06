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

export interface Customer {
  id: number;
  name: string;
  lastName: string | null;
  email: string | null;
  phone: string;
  address: string | null;
  note: string | null;
  active: boolean;
}

export function CustomersTable({
  customers,
  onDelete,
  onUpdate,
}: {
  readonly customers: Customer[];
  readonly onDelete?: (id: number) => void;
  readonly onUpdate?: (customer: Customer) => void;
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
          <TableHead>Nota</TableHead>
          <TableHead>Activo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.note}</TableCell>
            <TableCell>
              {customer.active ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-800" />
              )}
            </TableCell>
            <TableCell className="flex justify-start gap-2">
              <Button onClick={() => onUpdate?.(customer)}>Editar</Button>
              <Button
                onClick={() => onDelete?.(customer.id)}
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
