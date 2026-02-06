import { useEffect, useState } from "react";
import { CreateCustomerDialog } from "../components/CreateCustomerDialog";
import { getApiUrl } from "../config/api";
import { Button } from "../components/ui/button";
import { CustomersTable, type Customer } from "../components/CustomersTable";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [alert, setAlert] = useState<{
    title?: string;
    type: "error" | "success";
    message: string;
  } | null>(null);

  // Auto-remove alert after 10 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  useEffect(() => {
    // initial load
    fetch(getApiUrl("customers"))
      .then((r) => r.json())
      .then(setCustomers)
      .catch((err: unknown) => {
        console.error("Error al cargar los clientes", err);
        setCustomers([]);
      });
  }, []);

  const handleCreateCustomer = (payload: Omit<Customer, "id"> | Customer) => {
    try {
      if ("id" in payload) {
        // Update existing customer
        fetch(`${getApiUrl("customers")}/${payload.id.toString()}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((errorText) => {
                console.error(errorText);
                setAlert({
                  type: "error",
                  title: "Cliente no actualizado",
                  message: errorText || "Error al actualizar el cliente",
                });
                throw new Error(errorText);
              });
            }
            return res.json();
          })
          .then((data: unknown) => {
            const updated = data as Customer;
            setCustomers((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            );
          })
          .catch((err: unknown) => {
            // This will catch network errors or the thrown error from above
            console.error("Error al actualizar el cliente", err);
            // Only set alert if it wasn't already set in the error handling above
            if (!(err instanceof Error)) {
              setAlert({
                type: "error",
                title: "Error al actualizar el cliente",
                message: "El cliente no pudo ser actualizado",
              });
            }
          });
      } else {
        // Create new customer
        fetch(getApiUrl("customers"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((errorText) => {
                console.error(errorText);
                setAlert({
                  type: "error",
                  title: "Cliente no creado",
                  message: errorText || "Error al crear el cliente",
                });
                throw new Error(errorText);
              });
            }
            return res.json();
          })
          .then((data: unknown) => {
            const created = data as Customer;
            setCustomers((prev) => [created, ...prev]);
          })
          .catch((err: unknown) => {
            // This will catch network errors or the thrown error from above
            console.error("Error al crear el cliente", err);
            // Only set alert if it wasn't already set in the error handling above
            if (!(err instanceof Error)) {
              setAlert({
                type: "error",
                message: "Error al crear el cliente",
              });
            }
          });
      }
      setOpenDialog(false);
      setSelectedCustomer(null);
    } catch (err: unknown) {
      console.error("Error al guardar el cliente", err);
      setAlert({
        type: "error",
        title: "Error al guardar el cliente",
        message: "Error al guardar el cliente",
      });
    }
  };

  const handleDeleteCustomer = (id: number) => {
    fetch(`${getApiUrl("customers")}/${id.toString()}`, {
      method: "DELETE",
    }).catch((err: unknown) => {
      console.error("No se pudo eliminar el cliente", err);
    });
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button
          onClick={() => {
            setSelectedCustomer(null);
            setOpenDialog(true);
          }}
        >
          Nuevo cliente
        </Button>
      </div>
      <CreateCustomerDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreateCustomer={(customer) => {
          handleCreateCustomer(customer);
        }}
        customer={selectedCustomer}
      />
      {/* render your CustomersTable here with `customers` */}
      <CustomersTable
        customers={customers}
        onDelete={handleDeleteCustomer}
        onUpdate={(customer) => {
          setSelectedCustomer(customer);
          setOpenDialog(true);
        }}
      />

      <div>
        {alert && (
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            {alert.type === "error" ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
