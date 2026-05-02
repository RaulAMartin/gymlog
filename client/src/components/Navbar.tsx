import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Ejercicios",
    path: "/exercises",
  },
  {
    label: "Nueva sesión",
    path: "/sessions/new",
  },
  {
    label: "Historial",
    path: "/history",
  },
  {
    label: "Marcas RM",
    path: "/rm",
  },
];

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <span className="text-2xl font-bold text-blue-600">GymLog</span>

        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
