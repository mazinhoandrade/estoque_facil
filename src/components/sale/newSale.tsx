"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/src/hooks/use-toast";

interface ProductSale {
  id: string;
  name: string;
  price: number;
  quantity: number;
  quantityMax: number;
}

export const NewSale = () => {
  const [clientName, setClientName] = useState("");
  const [products, setProducts] = useState<ProductSale[]>([]);
  //const [selectedProduct, setSelectedProduct] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Debounce para evitar muitas requisições
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Busca de produtos com debounce
  const searchProducts = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const response = await fetch(
          `/api/products?q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [],
  );

  // Efeito para buscar produtos quando o termo muda
  useEffect(() => {
    searchProducts(productSearch);
  }, [productSearch, searchProducts]);

  const addProduct = (product: Product) => {
    if (quantity < 1) return;
    if (quantity > product.quantity)
      return toast({
        title: "Quantidade insuficiente",
        description: `Quantidade disponivel: ${product.quantity}`,
      });

    // Verifica se o produto já foi adicionado
    if (products.some((p) => p.id === product.id)) {
      toast({
        title: "Produto ja adicionado",
        description: "O produto ja foi adicionado ao carrinho",
      });
      return;
    }

    setProducts([
      ...products,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        quantityMax: product.quantity,
      },
    ]);

    setProductSearch("");
    //setSelectedProduct("");
    setQuantity(1);
    setSearchResults([]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity } : p)));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleSubmit = async () => {
    if (!clientName || products.length === 0) {
      toast({
        title: "Erro ao criar venda",
        description:
          "Por favor, preencha o nome do cliente e adicione produtos ao carrinho.",
      });
      return;
    }
    const productLimit = products.find((p) => p.quantity > p.quantityMax);

    if (productLimit) {
      toast({
        title: "Quantidade insuficiente",
        description: `O${productLimit?.length > 1 ? "s" : ""} produto${productLimit?.length > 1 ? "s" : ""} ${productLimit.name} tem ${productLimit.quantityMax} disponível`,
      });
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          products: products.map((p) => ({ id: p.id, quantity: p.quantity })),
        }),
      });

      if (response.ok) {
        router.push("/admin/venda");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <div className="mb-20 p-6">
      <h1 className="mb-6 text-2xl font-bold">Nova Venda</h1>

      <div className="mb-6 grid gap-4">
        <Input
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
      </div>

      <div className="mb-6 grid gap-4">
        <div className="relative">
          <Input
            placeholder="Buscar produto por nome ou código"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
          />
          {isSearching && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-900"></div>
            </div>
          )}
          {searchResults.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => addProduct(product)}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">
                    Código: {product.code} | Preço: R${" "}
                    {product.price.toFixed(2)} | Estoque: {product.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-20"
          />
          <span>unidades</span>
        </div>
      </div>

      {products.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Preço Unitário</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      max={product.quantityMax}
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, Number(e.target.value))
                      }
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    R$ {(product.price * product.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 text-right">
            <div className="text-xl font-semibold">
              Total: R$ {calculateTotal().toFixed(2)}
            </div>
          </div>
        </>
      )}

      <div className="mt-6">
        <Button onClick={handleSubmit} disabled={products.length === 0}>
          Finalizar Venda
        </Button>
      </div>
    </div>
  );
};
