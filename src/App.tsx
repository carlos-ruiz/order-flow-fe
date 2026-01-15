import { HeaderMenu } from "./components/HeaderMenu";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Customers } from "./pages/Customers";
import { Platforms } from "./pages/Platforms";

export default function App() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-4 max-w-7xl mx-auto">
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/platforms" element={<Platforms />} />
      </Routes>
    </div>
  );
}
