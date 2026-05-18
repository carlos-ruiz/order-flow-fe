import { Check, X } from "lucide-react";
import { Button, Table } from "@mantine/core";

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
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nombre</Table.Th>
          <Table.Th>Apellido</Table.Th>
          <Table.Th>Dirección</Table.Th>
          <Table.Th>Teléfono</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Nota</Table.Th>
          <Table.Th>Activo</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {customers.map((customer) => (
          <Table.Tr key={customer.id}>
            <Table.Td>{customer.name}</Table.Td>
            <Table.Td>{customer.lastName}</Table.Td>
            <Table.Td>{customer.address}</Table.Td>
            <Table.Td>{customer.phone}</Table.Td>
            <Table.Td>{customer.email}</Table.Td>
            <Table.Td>{customer.note}</Table.Td>
            <Table.Td>
              {customer.active ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-800" />
              )}
            </Table.Td>
            <Table.Td className="flex justify-start gap-2">
              <Button onClick={() => onUpdate?.(customer)}>Editar</Button>
              <Button onClick={() => onDelete?.(customer.id)} color="red">
                Eliminar
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
