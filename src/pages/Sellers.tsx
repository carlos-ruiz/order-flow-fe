import { useEffect, useState } from "react";
import { CreateSellerDialog } from "../components/CreateSellerDialog";
import { getApiUrl } from "../config/api";
import { Button } from "../components/ui/button";
import { SellersTable, type Seller } from "../components/SellersTable";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
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
    fetch(getApiUrl("sellers"))
      .then((r) => r.json())
      .then(setSellers)
      .catch((err: unknown) => {
        console.error("Error al cargar los vendedores", err);
        setSellers([]);
      });
  }, []);

  const handleCreateSeller = (payload: Omit<Seller, "id"> | Seller) => {
    try {
      if ("id" in payload) {
        // Update existing seller
        fetch(`${getApiUrl("sellers")}/${payload.id.toString()}`, {
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
                  title: "Vendedor no actualizado",
                  message: errorText || "Error al actualizar el vendedor",
                });
                throw new Error(errorText);
              });
            }
            return res.json();
          })
          .then((data: unknown) => {
            const updated = data as Seller;
            setSellers((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            );
          })
          .catch((err: unknown) => {
            // This will catch network errors or the thrown error from above
            console.error("Error al actualizar el vendedor", err);
            // Only set alert if it wasn't already set in the error handling above
            if (!(err instanceof Error)) {
              setAlert({
                type: "error",
                title: "Error al actualizar el vendedor",
                message: "El vendedor no pudo ser actualizado",
              });
            }
          });
      } else {
        // Create new seller
        fetch(getApiUrl("sellers"), {
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
                  title: "Vendedor no creado",
                  message: errorText || "Error al crear el vendedor",
                });
                throw new Error(errorText);
              });
            }
            return res.json();
          })
          .then((data: unknown) => {
            const created = data as Seller;
            setSellers((prev) => [created, ...prev]);
          })
          .catch((err: unknown) => {
            // This will catch network errors or the thrown error from above
            console.error("Error al crear el vendedor", err);
            // Only set alert if it wasn't already set in the error handling above
            if (!(err instanceof Error)) {
              setAlert({
                type: "error",
                message: "Error al crear el vendedor",
              });
            }
          });
      }
      setOpenDialog(false);
      setSelectedSeller(null);
    } catch (err: unknown) {
      console.error("Error al guardar el vendedor", err);
      setAlert({
        type: "error",
        title: "Error al guardar el vendedor",
        message: "Error al guardar el vendedor",
      });
    }
  };

  const handleDeleteSeller = (id: number) => {
    fetch(`${getApiUrl("sellers")}/${id.toString()}`, {
      method: "DELETE",
    }).catch((err: unknown) => {
      console.error("No se pudo eliminar el vendedor", err);
    });
    setSellers((prev) => prev.filter((seller) => seller.id !== id));
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
            setSelectedSeller(null);
            setOpenDialog(true);
          }}
        >
          Nuevo vendedor
        </Button>
      </div>
      <CreateSellerDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreateSeller={(seller) => {
          handleCreateSeller(seller);
        }}
        seller={selectedSeller}
      />
      {/* render your SellersTable here with `sellers` */}
      <SellersTable
        sellers={sellers}
        onDelete={handleDeleteSeller}
        onUpdate={(seller) => {
          setSelectedSeller(seller);
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
