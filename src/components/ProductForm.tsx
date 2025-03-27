"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProduct } from "../server/useMutations";
import { useCategories } from "../server/useQueries";
const formSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }),
  code: z.string({ required_error: "Código é obrigatório" }),
  description: z.string().optional(),
  quantity: z.string({ required_error: "Quantidade é obrigatória" }),
  price: z.string({ required_error: "Preço é obrigatório" }),
  categoryId: z.string({ required_error: "Categoria é obrigatória" }),
});
export const ProductForm = () => {
  const setProduct = useProduct();
  const categories = useCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formUser = formSchema.safeParse(values);
    if (!formUser.success) return;
    const data = {
      ...formUser.data,
      quantity: Number(formUser.data.quantity),
      price: Number(formUser.data.price),
    };
    await setProduct.mutateAsync(data as Product);
  };

  return (
    <div className="rounded p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold">Novo Produto</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto*:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Bola" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code*:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ex: 154" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: Alguma coisa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade*:</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço*:</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 10.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria da Empresa:</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={
                          categories.data?.find(
                            (category) => category.id === field.value,
                          )?.name
                        }
                      >
                        {
                          categories.data?.find(
                            (category) => category.id === field.value,
                          )?.name
                        }
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.data?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          /> */}

            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria do Produto:</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="">
                      {categories.data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full text-lg"
            disabled={setProduct.isPending}
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
};
