import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(
  date: Date | string,
  format: "default" | "file" | "full" = "default",
): string {
  const d = new Date(date);

  if (format === "file") {
    return [
      d.getDate().toString().padStart(2, "0"),
      (d.getMonth() + 1).toString().padStart(2, "0"),
      d.getFullYear(),
    ].join("-");
  }

  if (format === "full") {
    return d.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// export function formatDate(date: Date | string) {
//   return new Date(date).toLocaleDateString('pt-BR', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   })
// }

// export function formatCurrency(value: number) {
//   return new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value);
// }
// export function formatDate(
//   date: Date | string,
//   format: "default" | "file" = "default",
// ) {
//   const d = new Date(date);

//   if (format === "file") {
//     return [
//       d.getDate().toString().padStart(2, "0"),
//       (d.getMonth() + 1).toString().padStart(2, "0"),
//       d.getFullYear(),
//     ].join("-");
//   }

//   return d.toLocaleDateString("pt-BR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }
