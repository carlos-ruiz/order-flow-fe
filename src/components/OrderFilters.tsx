import type { Platform, Status } from "../pages/Dashboard";
import { Search } from "lucide-react";
import { Select, TextInput } from "@mantine/core";

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
        <TextInput
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          leftSection={<Search className="h-4 w-4" />}
        />
      </div>
      <Select
        className="w-full sm:w-[180px]"
        placeholder="Filter by status"
        value={statusFilter}
        onChange={(value) => {
          onStatusFilterChange(value ?? "all");
        }}
        data={[
          { value: "all", label: "Todos los estados" },
          ...statuses.map((status) => ({
            value: status.name,
            label: status.name,
          })),
        ]}
      />
      <Select
        className="w-full sm:w-[180px]"
        placeholder="Filter by platform"
        value={platformsFilter}
        onChange={(value) => {
          onPlatformsFilterChange(value ?? "all");
        }}
        data={[
          { value: "all", label: "Todas las plataformas" },
          ...platforms.map((platform) => ({
            value: platform.name,
            label: platform.name,
          })),
        ]}
      />
    </div>
  );
}
