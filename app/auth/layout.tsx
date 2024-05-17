"use client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: any) {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
