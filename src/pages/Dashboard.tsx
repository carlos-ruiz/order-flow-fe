import { useState, useMemo, useEffect } from "react";
import { OrderStats } from "../components/OrderStats";
import { OrdersTable } from "../components/OrdersTable";
import type { Order } from "../components/OrdersTable";
import { OrderFilters } from "../components/OrderFilters";
import { CreateOrderDialog } from "../components/CreateOrderDialog";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { getApiUrl } from "../config/api";

export type Status = {
  id: string;
  name: string;
  active: boolean;
};

export type Platform = {
  id: string;
  name: string;
  active: boolean;
  customerFee: number;
  sellerCommission: number;
};

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformsFilter, setPlatformsFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  // Extracted fetchers
  const fetchOrders = async () => {
    try {
      const res = await fetch(getApiUrl("orders"));
      const data: unknown = await res.json();
      setOrders(Array.isArray(data) ? (data as Order[]) : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const res = await fetch(getApiUrl("platforms"));
      const data: unknown = await res.json();
      setPlatforms(
        Array.isArray(data)
          ? (data as Platform[]).map((p) => ({
              ...p,
              id: typeof p.id === "string" ? p.id : String(p.id),
            }))
          : [],
      );
    } catch (err) {
      console.error("Error fetching platforms:", err);
      setPlatforms([]);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await fetch(getApiUrl("statuses"));
      const data: unknown = await res.json();
      setStatuses(
        Array.isArray(data)
          ? (data as Status[]).map((s) => ({
              ...s,
              id: typeof s.id === "string" ? s.id : String(s.id),
            }))
          : [],
      );
    } catch (err) {
      console.error("Error fetching statuses:", err);
      setStatuses([]);
    }
  };

  useEffect(() => {
    void Promise.all([fetchOrders(), fetchPlatforms(), fetchStatuses()]);
  }, []);

  // Filter orders based on search and status
  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const matchesSearch =
        order.id == searchTerm ||
        searchTerm === "" ||
        order.platformName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.statusName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.statusName === statusFilter;

      const matchesPlatform =
        platformsFilter === "all" || order.platformName === platformsFilter;

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [orders, searchTerm, statusFilter, platformsFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum: number, order: Order) => sum + order.totalAmount,
      0,
    );
    const processingOrders = orders.filter(
      (o: Order) => o.statusName === "processing",
    ).length;
    const completedOrders = orders.filter(
      (o: Order) => o.statusName === "completed",
    ).length;

    return {
      totalOrders,
      totalRevenue,
      processingOrders,
      completedOrders,
    };
  }, [orders]);

  const handleStatusChange = (
    orderId: string | undefined,
    newStatus: Order["statusName"],
  ) => {
    setOrders((prevOrders: Order[]) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, statusName: newStatus } : order,
      ),
    );
  };

  const handleDelete = (orderId: string | undefined) => {
    setOrders((prevOrders: Order[]) =>
      prevOrders.filter((order) => order.id !== orderId),
    );
  };

  const handleCreateOrder = async (newOrder: Omit<Order, "id">) => {
    // Generate a new order ID
    // const newId = `ORD-${String(orders.length + 1).padStart(3, "0")}`;
    const orderWithId: Order = {
      ...newOrder,
    };
    const res = await fetch(getApiUrl("orders"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderWithId),
    });
    const data: unknown = await res.json();
    const created = data as Order;

    setOrders((prevOrders) => [created, ...prevOrders]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Administrador de Pedidos</h1>
          <p className="text-muted-foreground">
            Administra y rastrea todos tus pedidos
          </p>
        </div>
        <Button
          onClick={() => {
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>

      {/* Stats */}
      <OrderStats stats={stats} />

      {/* Filters */}
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        platformsFilter={platformsFilter}
        onPlatformsFilterChange={setPlatformsFilter}
        platforms={platforms}
        statuses={statuses}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <CreateOrderDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateOrder={(order) => {
          void handleCreateOrder(order);
        }}
        platforms={platforms}
        statuses={statuses}
      />
    </div>
  );
}
