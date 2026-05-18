import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, MantineProvider, DEFAULT_THEME } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const theme = createTheme({
  primaryColor: "tulip-green",
  colors: {
    "tulip-green": [
      "#F8FAF5", // 0 - lightest (background)
      "#E6F2E6", // 1 - surface
      "#A8E6A3", // 2 - light
      "#7BC47F", // 3 - main (soft green)
      "#4E944F", // 4 - dark
      "#3B6B3B", // 5 - darker
      "#222E22", // 6 - text dark
      "#B7C9B7", // 7 - border/muted
      "#8FA98F", // 8 - border strong
      "#4E944F", // 9 - for contrast
    ],
    "tulip-pink": [
      "#FFF6FB", // 0
      "#FFD6E0", // 1
      "#F7A1C4", // 2 (main)
      "#E86CA7", // 3
      "#C96A8A", // 4 (dark)
      "#A84D6A", // 5
      "#7A2F4D", // 6
      "#F7A1C4", // 7
      "#FFD6E0", // 8
      "#F7A1C4", // 9
    ],
    "tulip-yellow": [
      "#FFFDEB", // 0
      "#FFF6B7", // 1
      "#FFE066", // 2 (main)
      "#FFD600", // 3 (dark)
      "#FFB800", // 4
      "#FFD600", // 5
      "#FFE066", // 6
      "#FFF6B7", // 7
      "#FFFDEB", // 8
      "#FFE066", // 9
    ],
    // Use Mantine's default gray for neutral
    gray: DEFAULT_THEME.colors.gray,
  },
  defaultRadius: "md",
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  headings: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  primaryShade: 3,
});

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>,
  );
} else {
  console.error("Root element not found");
}
