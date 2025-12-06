import Header from "@/components/Main/Header";
import { Outlet } from "react-router-dom";

export default function IndexLayout() {
  return (
    <div>
      <div className="relative overflow-hidden whitespace-nowrap w-full bg-blue-950 py-2">
        <p className="inline-block text-white text-xs font-semibold animate-marquee">
          🔥 Today's deals: 20% off sportswear for women, men, and sports accessories 🏋️‍♂️ — Free shipping on orders over $500 🚚 —         Take advantage before <span className="text-red-300">it's too late</span>! 🕒
        </p>
      </div>

      <Header/>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
