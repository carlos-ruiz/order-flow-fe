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
  readonly onUpdate?: (id: number, platform: Platform) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Comisión cobrada al cliente</TableHead>
          <TableHead>Comisión pagada al vendedor</TableHead>
          <TableHead>Activo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {platforms.map((platform) => (
          <TableRow key={platform.id}>
            <TableCell>{platform.name}</TableCell>
            <TableCell>{platform.customerFee}</TableCell>
            <TableCell>{platform.sellerCommission}</TableCell>
            <TableCell>
              {platform.active ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-800" />
              )}
            </TableCell>
            <TableCell className="flex justify-start gap-2">
              <Button onClick={() => onUpdate?.(platform.id, platform)}>
                Editar
              </Button>
              <Button
                onClick={() => onDelete?.(platform.id)}
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
