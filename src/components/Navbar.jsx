import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import navLogo from "../assets/Logos/education.png";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const user = true;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const commonNavItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  const dashboardItems = [
    { name: "Add Service", path: "/dashboard/add-service" },
    { name: "Manage Service", path: "/dashboard/manage-service" },
    { name: "Booked-Services", path: "/dashboard/booked-services" },
    { name: "Service-To-Do", path: "/dashboard/service-to-do" },
  ];

  return (
    <nav className="flex items-center justify-between bg-base-300 px-4 py-3 shadow-md relative">
      {/* Left section: Logo + Website Name */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-10 h-10 cursor-pointer hidden lg:inline-block"
            src={navLogo}
            alt="Education Logo"
          />
          <h1 className="text-lg font-bold select-none">
            <span className="text-secondary">Edu</span>
            <span className="text-primary">Care</span>
          </h1>
        </Link>
      </div>

      {/* Middle section: Nav items for large screens */}
      <ul className="hidden lg:flex items-center gap-6">
        {commonNavItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-base-200 hover:text-accent"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        {!user && (
          <li>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-base-200 hover:text-accent"
                }`
              }
            >
              Login
            </NavLink>
          </li>
        )}

        {user && (
          <>
            <li className="relative">
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md font-medium hover:bg-base-200"
                aria-haspopup="true"
                aria-expanded={dashboardOpen}
                aria-label="Dashboard dropdown"
              >
                Dashboard <ChevronDown size={16} />
              </button>

              {dashboardOpen && (
                <ul className="absolute right-0 mt-2 w-48 rounded-md bg-base-100 shadow-lg z-50">
                  {dashboardItems.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onClick={() => setDashboardOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 hover:bg-base-200 ${
                            isActive ? "bg-primary text-white" : ""
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              {/* Logout with user info */}
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  src={user?.image}
                  alt={`${user?.name}'s avatar`}
                  className="w-8 h-8 rounded-full"
                  title={user?.name}
                />
                <span className="font-semibold">{user?.name}</span>
                <button
                  onClick={() => {
                    alert("Logout clicked!");
                    // Add real logout logic here
                  }}
                  className="btn btn-sm btn-outline ml-4"
                >
                  Logout
                </button>
              </div>
            </li>
          </>
        )}
      </ul>

      {/* Right section: Theme toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="btn btn-sm btn-outline rounded-full"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-opacity-40">
          <div
            className="absolute inset-0"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-14 left-0 w-64 bg-base-100 p-6 shadow-lg rounded-r-lg overflow-auto">
            <ul className="flex flex-col gap-4">
              {commonNavItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {!user && (
                <li>
                  <NavLink
                    to="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}

              {user && (
                <>
                  <li>
                    <button
                      onClick={() => setDashboardOpen(!dashboardOpen)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-base-200"
                      aria-haspopup="true"
                      aria-expanded={dashboardOpen}
                    >
                      Dashboard <ChevronDown size={16} />
                    </button>

                    {dashboardOpen && (
                      <ul className="mt-2 ml-4 flex flex-col gap-2">
                        {dashboardItems.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.path}
                              onClick={() => {
                                setMenuOpen(false);
                                setDashboardOpen(false);
                              }}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-md ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-base-200"
                                }`
                              }
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        alert("Logout clicked!");
                        setMenuOpen(false);
                      }}
                      className="btn btn-outline w-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
