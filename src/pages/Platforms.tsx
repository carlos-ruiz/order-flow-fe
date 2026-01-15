import { useEffect, useState } from "react";
import { CreatePlatformDialog } from "../components/CreatePlatformDialog";
import { type Platform } from "../components/PlatformsTable";
import { getApiUrl } from "../config/api";
import { Button } from "../components/ui/button";
import { PlatformsTable } from "../components/PlatformsTable";

export function Platforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  useEffect(() => {
    // initial load
    fetch(getApiUrl("platforms"))
      .then((r) => r.json())
      .then(setPlatforms)
      .catch((err: unknown) => {
        console.error("Error al cargar las plataformas", err);
        setPlatforms([]);
      });
  }, []);

  const handleCreatePlatform = async (
    payload: Omit<Platform, "id"> | Platform
  ) => {
    try {
      if ("id" in payload) {
        // Update existing platform
        await fetch(`${getApiUrl("platforms")}/${payload.id.toString()}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setPlatforms((prev) =>
          prev.map((p) => (p.id === payload.id ? payload : p))
        );
      } else {
        // Create new platform
        const res = await fetch(getApiUrl("platforms"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data: unknown = await res.json();
        const created = data as Platform;
        setPlatforms((prev) => [created, ...prev]);
      }
      setOpenDialog(false);
      setSelectedPlatform(null);
    } catch (err: unknown) {
      console.error("Error al guardar la plataforma", err);
    }
  };

  const handleDeletePlatform = (id: number) => {
    fetch(`${getApiUrl("platforms")}/${id.toString()}`, {
      method: "DELETE",
    }).catch((err: unknown) => {
      console.error("No se pudo eliminar la plataforma", err);
    });
    setPlatforms((prev) => prev.filter((platform) => platform.id !== id));
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
            setSelectedPlatform(null);
            setOpenDialog(true);
          }}
        >
          Nueva plataforma
        </Button>
      </div>
      <CreatePlatformDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreatePlatform={(platform) => {
          void handleCreatePlatform(platform);
        }}
        platform={selectedPlatform}
      />
      {/* render your PlatformsTable here with `platforms` */}
      <PlatformsTable
        platforms={platforms}
        onDelete={handleDeletePlatform}
        onUpdate={(platform) => {
          setSelectedPlatform(platform);
          setOpenDialog(true);
        }}
      />
    </>
  );
}
