"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between items-center gap-4 p-4 bg-chart-1">
        <div>
          <h1 className="text-2xl font-bold">frit omelette</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3">
            <Link href="/login">Login</Link>
            <Link href="/Register">Signup</Link>
          </div>
        </div>
      </nav>
      <div className="flex gap-3 flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Landing Page</h1>
        <h1 className="text-2xl font-bold">TO BE IMPLEMENTED</h1>
      </div>
    </div>
  );
}
