'use client'
import Image from "next/image";
import DashboardPage from "./client/dashboard/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div >
      <h2> Welcome </h2>
      <button onClick={() => {router.push('client/dashboard')} }> Check Dashboard </button>
    </div>
  );
}
