"use client";
import { Barcode, House, Menu, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMobile = () => {
  //const [isActive, setIsActive] = useState("home");
  const pathname = usePathname();
  const user = false;

  const handleLinkClick = (active: string = "") => {
    return pathname?.slice(1, pathname?.length) === active
      ? "bg-primary  p-2 rounded-lg p flex flex-col items-center"
      : "p p-2 flex flex-col items-center ";
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 left-0 right-0 z-40 border-t bg-white dark:bg-black lg:hidden">
      <div className="flex justify-around p-2">
        <Link href="/admin" className={` ${handleLinkClick("admin")}`}>
          <span className="text-2xl">
            <House />
          </span>
          <span className="text-xs">Início</span>
        </Link>

        <Link href="/admin/produto">
          <button
            disabled={user}
            className={`${handleLinkClick("admin/produto")}`}
          >
            <span className="text-2xl">
              <Barcode />
            </span>
            <span className="text-xs">Estoque</span>
          </button>
        </Link>

        <Link href="/admin/categoria">
          <button
            disabled={user}
            className={`${handleLinkClick("admin/categoria")}`}
          >
            <span className="text-2xl">
              <Tag />
            </span>
            <span className="text-xs">categorias</span>
          </button>
        </Link>

        <Link href="/admin/venda">
          <button
            disabled={user}
            className={`${handleLinkClick("admin/venda")}`}
          >
            <span className="text-2xl">
              <ShoppingCart />
            </span>
            <span className="text-xs">Vendas</span>
          </button>
        </Link>

        <Link href="/admin/menu" className={`${handleLinkClick("menu")}`}>
          <span className="text-2xl">
            <Menu />
          </span>
          <span className="text-xs">Conta</span>
        </Link>
      </div>
    </nav>
  );
};
