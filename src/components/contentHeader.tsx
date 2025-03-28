import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  label: string;
}
export const ContentHeader = ({ label }: Props) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold capitalize">{`${label}s`}</h1>
      <Link href={`/admin/${label}/new`}>
        <Button className="capitalize">adicionar {label}</Button>
      </Link>
    </div>
  );
};
