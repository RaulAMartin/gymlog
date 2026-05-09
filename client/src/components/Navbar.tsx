import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

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
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <span className="text-2xl font-bold text-blue-600">
          GymLog
        </span>

        <div className="flex flex-wrap items-center gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {user && (
            <span className="px-2 py-2 text-sm text-gray-600 dark:text-gray-300">
              {user.email}
            </span>
          )}

          {user && (
            <button
              type="button"
              onClick={signOut}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Salir
            </button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
