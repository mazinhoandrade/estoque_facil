import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  onClick: () => void;
  label?: string;
  name?: string;
};
export const DeleteButton = ({ onClick, label, name }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex p-3 flex-col gap-2 justify-center items-center md:flex-row">
          <div>
            <Trash2 className="text-destructive" />
          </div>
          {/* {label && <div className="capitalize font-bold">{label}</div>} */}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o{" "}
            {name?.replace(/-/g, " ")} {label &&  'É todo os produtos relacionados a esta categoria'}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
