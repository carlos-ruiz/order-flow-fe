import type { Platform, Status } from "../pages/Dashboard";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  platformsFilter: string;
  onPlatformsFilterChange: (value: string) => void;
  platforms: Platform[];
  statuses: Status[];
}

export function OrderFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  platformsFilter,
  onPlatformsFilterChange,
  platforms,
  statuses,
}: Readonly<OrderFiltersProps>) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          className="pl-9"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.name}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={platformsFilter} onValueChange={onPlatformsFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las plataformas</SelectItem>
          {platforms.map((platform) => (
            <SelectItem key={platform.id} value={platform.name}>
              {platform.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
