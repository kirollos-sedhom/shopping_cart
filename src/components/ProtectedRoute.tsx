import React, { type JSX } from "react";
import type { RootState } from "../redux/app/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  if (isLoading) return <div>loading...</div>;
  return user ? children : <Navigate to={"/login"} replace={true} />;
}
