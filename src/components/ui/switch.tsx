"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

function Switch({
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const isChecked = props.checked ?? props.defaultChecked ?? false;

  return (
    <SwitchPrimitive.Root
      {...props}
      style={{
        width: "44px",
        height: "24px",
        padding: "2px",
        borderRadius: "12px",
        border: "2px solid #e0e0e0",
        backgroundColor: isChecked ? "#86efac" : "#d1d5db",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        transition: "background-color 0.3s",
      }}
    >
      <SwitchPrimitive.Thumb
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "white",
          transform: isChecked ? "translateX(20px)" : "translateX(0px)",
          transition: "transform 0.3s",
          display: "block",
        }}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
