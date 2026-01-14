import { Link } from "react-router-dom";

export function HeaderMenu() {
  return (
    <div className="max-w-7xl mx-auto gap-y-6 flex items-start justify-between mb-6">
      <p className="text-2xl font-bold">Ventas Yaqui</p>
      <nav className="max-w-7xl space-y-6">
        <ul className="flex items-center gap-4">
          <li className="text-sm font-medium">
            <Link to="/">Inicio</Link>
          </li>
          <li className="text-sm font-medium hover:text-primary hover:underline">
            <Link to="/products">Productos</Link>
          </li>
          <li className="text-sm font-medium hover:text-primary hover:underline">
            <Link to="/orders">Órdenes</Link>
          </li>
          <li className="text-sm font-medium hover:text-primary hover:underline">
            <Link to="/customers">Clientes</Link>
          </li>
          <li className="text-sm font-medium hover:text-primary hover:underline">
            <Link to="/platforms">Plataformas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
