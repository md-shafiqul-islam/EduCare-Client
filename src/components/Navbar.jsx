import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import navLogo from "../assets/Logos/education.png";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const commonNavItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/all-services" },
    { name: "About Us", path: "/about" },
    { name: "Subjects", path: "/subjects" },
  ];

  const dashboardItems = [
    { name: "Add Service", path: "/dashboard/add-service" },
    { name: "Manage Service", path: "/dashboard/manage-service" },
    { name: "Booked-Services", path: "/dashboard/booked-services" },
    { name: "Service-To-Do", path: "/dashboard/service-to-do" },
  ];

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            // First show success alert
            Swal.fire({
              title: "Logout Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              navigate("/auth/login");
            }, 1600);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed!",
              text: error.message || "Something went wrong.",
            });
          });
      }
    });
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-base-300 shadow-md backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Left: Logo + Mobile Toggle */}
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
              <h1 className="text-xl font-extrabold select-none tracking-wide">
                <span className="text-primary">Edu</span>
                <span className="text-secondary">Care</span>
              </h1>
            </Link>
          </div>

          {/* Middle: Desktop Nav Items */}
          <ul className="hidden lg:flex items-center gap-6">
            {commonNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-base-100"
                        : "hover:bg-base-200 hover:text-primary"
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
                    `px-3 py-2 rounded-md font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-base-200 hover:text-primary"
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
                    className="flex items-center gap-1 px-3 py-2 rounded-md font-semibold hover:text-primary hover:bg-base-200 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={dashboardOpen}
                  >
                    Dashboard <ChevronDown size={16} />
                  </button>
                  {dashboardOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-base-300 shadow-lg z-50 rounded-lg overflow-hidden">
                      {dashboardItems.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.path}
                            onClick={() => setDashboardOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm font-medium ${
                                isActive
                                  ? "bg-secondary text-white"
                                  : "hover:bg-base-200 hover:text-primary"
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

                <li className="flex items-center gap-2">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-8 h-8 rounded-full"
                    title={user?.displayName}
                  />
                  <span className="font-medium">{user?.displayName}</span>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-sm btn-outline hover:bg-accent"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Right: Theme Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline rounded-full"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="absolute top-0 left-0 mt-12 h-fit w-72 bg-base-300 shadow-xl rounded-r-2xl p-6 z-50 transition-all duration-300 ease-in-out">
            <ul className="flex flex-col gap-4">
              {commonNavItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md font-semibold transition-colors ${
                        isActive
                          ? "bg-primary text-base-100"
                          : "hover:bg-base-200 hover:text-primary"
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
                      `block px-4 py-2 rounded-md font-medium ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-base-200 hover:text-primary"
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
                      className="flex items-center justify-between w-full px-4 py-2 rounded-md font-medium hover:bg-base-200"
                    >
                      Dashboard <ChevronDown size={16} />
                    </button>

                    {dashboardOpen && (
                      <ul className="ml-4 mt-2 flex flex-col gap-2">
                        {dashboardItems.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.path}
                              onClick={() => {
                                setMenuOpen(false);
                                setDashboardOpen(false);
                              }}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-md font-medium ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-base-200 hover:text-primary"
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
                        handleSignOut();
                        setMenuOpen(false);
                      }}
                      className="btn btn-outline w-full mt-2 hover:bg-accent"
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
    </>
  );
};

export default Navbar;
