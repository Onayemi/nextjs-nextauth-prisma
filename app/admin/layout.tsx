"use client";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";

export default function Layout({ children }: any) {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      <Topbar />
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
