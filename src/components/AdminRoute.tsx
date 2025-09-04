// components/AdminRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../redux/app/store";
import type { JSX } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading, isAdmin } = useSelector((s: RootState) => s.auth);

  if (isLoading || isAdmin === null) return null; // or a loader
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
