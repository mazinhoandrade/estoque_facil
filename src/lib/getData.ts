// Função para gerar dados mensais do ano atual
import prisma from "@/lib/prisma"

export async function generateYearlySalesData() {
    // 1. Busca todas as vendas do ano atual
    const currentYear = new Date().getFullYear()
    const startDate = new Date(`${currentYear}-01-01`)
    const endDate = new Date(`${currentYear}-12-31 23:59:59`)
  
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        id: true,
        total: true,
        createdAt: true,
        orderProduct: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })
  
    // 2. Inicializa estrutura para todos os meses do ano
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, i, 1)
      return {
        month: date.toLocaleDateString('pt-BR', { month: 'long' }),
        year: currentYear,
        totalSales: 0,
        orderCount: 0,
        productsSold: 0,
      }
    })
  
    // 3. Processa cada venda e agrupa por mês
    orders.forEach(order => {
      const orderMonth = new Date(order.createdAt).getMonth()
      const monthData = monthlyData[orderMonth]
      
      // Atualiza totais
      monthData.totalSales += order.total
      monthData.orderCount += 1
      
      // Processa produtos vendidos
      order.orderProduct.forEach(item => {
        monthData.productsSold += item.quantity 
      })
    })
  
  
    // 5. Formata dados para o gráfico
    const chartData = monthlyData.map(month => ({
      month: `${month.month.charAt(0).toUpperCase() + month.month.slice(1)}/${month.year.toString().slice(2)}`,
      vendas: month.totalSales,
      pedidos: month.orderCount,
      produtos: month.productsSold,
    }))
  
    return {
      yearlySummary: {
        totalSales: monthlyData.reduce((sum, month) => sum + month.totalSales, 0),
        totalOrders: orders.length,
        averageOrderValue: orders.length > 0 
          ? monthlyData.reduce((sum, month) => sum + month.totalSales, 0) / orders.length 
          : 0
      },
      monthlyData: chartData
    }
  }
  
  