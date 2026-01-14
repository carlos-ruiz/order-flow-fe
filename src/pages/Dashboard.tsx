import { useState, useMemo, useEffect } from "react";
import { OrderStats } from "../components/OrderStats";
import { OrdersTable } from "../components/OrdersTable";
import type { Order } from "../components/OrdersTable";
import { OrderFilters } from "../components/OrderFilters";
import { CreateOrderDialog } from "../components/CreateOrderDialog";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { getApiUrl } from "../config/api";

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john.smith@example.com",
    product: "Wireless Headphones",
    amount: 299,
    status: "delivered",
    date: "2025-09-28",
    quantity: 1,
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    product: "Smart Watch Pro",
    amount: 449,
    status: "shipped",
    date: "2025-09-29",
    quantity: 1,
  },
  {
    id: "ORD-003",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    product: "Laptop Stand",
    amount: 89,
    status: "processing",
    date: "2025-09-30",
    quantity: 2,
  },
  {
    id: "ORD-004",
    customer: "Emily Brown",
    email: "emily.brown@example.com",
    product: "Mechanical Keyboard",
    amount: 159,
    status: "pending",
    date: "2025-10-01",
    quantity: 1,
  },
  {
    id: "ORD-005",
    customer: "David Wilson",
    email: "d.wilson@example.com",
    product: "USB-C Hub",
    amount: 79,
    status: "delivered",
    date: "2025-09-27",
    quantity: 3,
  },
  {
    id: "ORD-006",
    customer: "Lisa Anderson",
    email: "lisa.a@example.com",
    product: "Webcam HD",
    amount: 129,
    status: "processing",
    date: "2025-09-30",
    quantity: 1,
  },
  {
    id: "ORD-007",
    customer: "James Martinez",
    email: "j.martinez@example.com",
    product: "Monitor 27inch",
    amount: 399,
    status: "shipped",
    date: "2025-09-29",
    quantity: 1,
  },
  {
    id: "ORD-008",
    customer: "Jessica Lee",
    email: "jessica.lee@example.com",
    product: "Desk Mat",
    amount: 39,
    status: "cancelled",
    date: "2025-09-26",
    quantity: 2,
  },
];

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    // Load orders from an API or local storage
    const fetchOrders = () => {
      // Simulate API call
      // const response = await fetch('/api/orders');
      // const data = await response.json();
      // setOrders(data);\
      fetch(getApiUrl("orderItems"))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setOrders(data);\
          setOrders(initialOrders); // Using initialOrders as mock data for now
        })
        .catch((err: unknown) => {
          console.error("Error fetching orders:", err);
          setOrders(initialOrders); // Fallback to initial orders on error
        });
    };

    fetchOrders();
  }, []);

  // Filter orders based on search and status
  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum: number, order: Order) => sum + order.amount,
      0
    );
    const pendingOrders = orders.filter(
      (o: Order) => o.status === "pending"
    ).length;
    const completedOrders = orders.filter(
      (o: Order) => o.status === "delivered"
    ).length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
    };
  }, [orders]);

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prevOrders: Order[]) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDelete = (orderId: string) => {
    setOrders((prevOrders: Order[]) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const handleCreateOrder = (newOrder: Omit<Order, "id">) => {
    // Generate a new order ID
    const newId = `ORD-${String(orders.length + 1).padStart(3, "0")}`;
    const orderWithId: Order = {
      id: newId,
      ...newOrder,
    };
    setOrders((prevOrders) => [orderWithId, ...prevOrders]);
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
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
}
