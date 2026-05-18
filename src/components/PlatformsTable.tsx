import { Check, X } from "lucide-react";
import { Button, Table } from "@mantine/core";

export interface Platform {
  id: number;
  name: string;
  customerFee: number;
  sellerCommission: number;
  active: boolean;
}

export function PlatformsTable({
  platforms,
  onDelete,
  onUpdate,
}: {
  readonly platforms: Platform[];
  readonly onDelete?: (id: number) => void;
  readonly onUpdate?: (platform: Platform) => void;
}) {
  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nombre</Table.Th>
          <Table.Th>Comisión cobrada al cliente</Table.Th>
          <Table.Th>Comisión pagada al vendedor</Table.Th>
          <Table.Th>Activo</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {platforms.map((platform) => (
          <Table.Tr key={platform.id}>
            <Table.Td>{platform.name}</Table.Td>
            <Table.Td>{platform.customerFee}</Table.Td>
            <Table.Td>{platform.sellerCommission}</Table.Td>
            <Table.Td>
              {platform.active ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-800" />
              )}
            </Table.Td>
            <Table.Td className="flex justify-start gap-2">
              <Button onClick={() => onUpdate?.(platform)}>Editar</Button>
              <Button onClick={() => onDelete?.(platform.id)} color="red">
                Eliminar
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
