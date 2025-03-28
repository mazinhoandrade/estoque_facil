interface OrderProduct {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    product: {
      id: string;
      name: string;
    };
  }
  
  interface Order {
    orderProduct: OrderProduct[];
  }
  
  interface TopProduct {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    totalSales: number; // quantidade * preço
  }
  export const getTopProducts = (orders: Order[]) => {
    if (!orders) {
      return [];
    }

    const topProducts: TopProduct[] = orders
    .flatMap((order: Order) => order.orderProduct)
    .reduce((acc: TopProduct[], item: OrderProduct) => {
      const existing = acc.find(p => p.productId === item.productId);
      
      if (existing) {
        existing.quantity += item.quantity;
        existing.totalSales += item.quantity * item.price;
      } else {
        acc.push({
          productId: item.productId,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity,
          totalSales: item.quantity * item.price
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);
    
    return topProducts;
  }
  