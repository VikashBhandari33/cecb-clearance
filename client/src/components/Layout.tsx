import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore, Role } from "../store/authStore";
import { api } from "../config/api";
import toast from "react-hot-toast";
import {
  LayoutDashboard, FileText, Calendar,
  BarChart2, Users, Settings, Bell, ChevronDown, LogOut,
} from "lucide-react";

const NAV_BY_ROLE: Record<Role, { label: string; path: string; icon: any }[]> = {
  PROPONENT: [
    { label: "Dashboard",     path: "/dashboard",    icon: LayoutDashboard },
    { label: "Applications",  path: "/applications", icon: FileText        },
    { label: "Meetings",      path: "/meetings",     icon: Calendar        },
    { label: "Reports",       path: "/reports",      icon: BarChart2       },
  ],
  SCRUTINY: [
    { label: "Dashboard",     path: "/scrutiny",       icon: LayoutDashboard },
    { label: "Applications",  path: "/scrutiny/queue", icon: FileText        },
    { label: "Meetings",      path: "/meetings",       icon: Calendar        },
    { label: "Reports",       path: "/reports",        icon: BarChart2       },
  ],
  MOM_TEAM: [
    { label: "Dashboard",     path: "/mom",        icon: LayoutDashboard },
    { label: "Applications",  path: "/mom/queue",  icon: FileText        },
    { label: "Meetings",      path: "/meetings",   icon: Calendar        },
    { label: "Reports",       path: "/reports",    icon: BarChart2       },
  ],
  ADMIN: [
    { label: "Dashboard",     path: "/admin",          icon: LayoutDashboard },
    { label: "Applications",  path: "/admin/apps",     icon: FileText        },
    { label: "Meetings",      path: "/meetings",       icon: Calendar        },
    { label: "Reports",       path: "/reports",        icon: BarChart2       },
    { label: "Users & Roles", path: "/admin/users",    icon: Users           },
    { label: "Settings",      path: "/admin/settings", icon: Settings        },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const navItems = NAV_BY_ROLE[user?.role ?? "PROPONENT"] ?? [];

  const handleLogout = async () => {
    try { await api.post("/api/auth/logout"); } catch {}
    logout();
    navigate("/login");
    toast.success("Logged out");
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F3F4F6" }}>

      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col flex-shrink-0"
        style={{ width: 210, background: "#0d1f2d" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: 34, height: 34, background: "#2D6A4F" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 4z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-white">PARIVESH</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>3.0</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={({ isActive }) => ({
                background: isActive ? "#1B4332" : "transparent",
                color: isActive ? "white" : "rgba(255,255,255,0.55)",
                fontWeight: isActive ? 600 : 400,
              })}
            >
              <item.icon size={15} className="flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ width: 28, height: 28, background: "#2D6A4F" }}
          >
            {user?.name?.[0] ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1 rounded transition"
            style={{ color: "rgba(255,255,255,0.4)" }}
            title="Logout"
          >
            <LogOut size={12} />
          </button>
        </div>
      </aside>

      {/* ── Right side ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top header */}
        <header
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ height: 52, background: "#1a3a5c", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <h1 className="text-white font-semibold text-sm">
            CECB Role-Based Environmental Clearance System
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
              <Bell size={17} />
              <span
                className="absolute rounded-full"
                style={{ top: 6, right: 6, width: 7, height: 7, background: "#EF4444" }}
              />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                className="rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ width: 28, height: 28, background: "#2D6A4F" }}
              >
                {user?.name?.[0] ?? "U"}
              </div>
              <div>
                <p className="text-white text-xs font-semibold">{user?.name}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Dashboard</p>
              </div>
              <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.45)" }} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}