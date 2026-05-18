import { Check, X } from "lucide-react";
import { Button, Table } from "@mantine/core";

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
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nombre</Table.Th>
          <Table.Th>Apellido</Table.Th>
          <Table.Th>Dirección</Table.Th>
          <Table.Th>Teléfono</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Activo</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sellers.map((seller) => (
          <Table.Tr key={seller.id}>
            <Table.Td>{seller.name}</Table.Td>
            <Table.Td>{seller.lastName}</Table.Td>
            <Table.Td>{seller.address}</Table.Td>
            <Table.Td>{seller.phone}</Table.Td>
            <Table.Td>{seller.email}</Table.Td>
            <Table.Td>
              {seller.active ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-800" />
              )}
            </Table.Td>
            <Table.Td className="flex justify-start gap-2">
              <Button onClick={() => onUpdate?.(seller)}>Editar</Button>
              <Button onClick={() => onDelete?.(seller.id)} color="red">
                Eliminar
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
