import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";

function Placeholder({ title, role }: { title: string; role: string }) {
  const user = useAuthStore((s) => s.user);
  return (
    <Layout>
      <div className="p-8">
        <div
          className="rounded-2xl p-8 max-w-md"
          style={{ background: "#D8F3DC", border: "1px solid #74C69D" }}
        >
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#1B4332" }}>
            {title}
          </h1>
          <p className="text-sm text-gray-600">
            Logged in as:{" "}
            <span className="font-semibold" style={{ color: "#1B4332" }}>
              {user?.name} ({role})
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-4">Full dashboard coming on Day 4.</p>
        </div>
      </div>
    </Layout>
  );
}

export const AdminDashboard    = () => <Placeholder title="Admin Dashboard"    role="ADMIN"    />;
export const ScrutinyDashboard = () => <Placeholder title="Scrutiny Dashboard" role="SCRUTINY" />;
export const MomDashboard      = () => <Placeholder title="MoM Dashboard"      role="MOM_TEAM" />;

export const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <p className="text-7xl font-black text-gray-200 mb-4">403</p>
      <p className="text-gray-600 font-semibold mb-2">Access Denied</p>
      <a href="/login" className="text-sm font-medium underline" style={{ color: "#1B4332" }}>
        Back to login
      </a>
    </div>
  </div>
);