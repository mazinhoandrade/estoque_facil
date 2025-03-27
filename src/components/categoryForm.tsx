"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product } from "@prisma/client";
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

import { useCategory } from "../server/useMutations";
const formSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }),
});
export const CategoryForm = () => {
  const setCategory = useCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formUser = formSchema.safeParse(values);
    if (!formUser.success) return;
    const data = {
      ...formUser.data,
    };
    setCategory.mutate(data as Category);
  };

  return (
    <div className="rounded p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold">Nova Categoria</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols gap-4 md:grid-cols-2 items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria*:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Perfume" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button
            className="w-full text-lg mt-8"
            disabled={setCategory.isPending}
            type="submit"
          >
            Cadastra
          </Button>
          </div>


        </form>
      </Form>
    </div>
  );
};
