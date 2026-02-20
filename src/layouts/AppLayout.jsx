import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}