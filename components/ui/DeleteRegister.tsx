"use client";

import { deleteRegister } from "@/lib/actions";
import { toast, Toaster } from "sonner";
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
import { Button } from "@/components/ui/button";

export function DeleteRegister({ id }: { id: string }) {
  const handleDelete = async (id: string) => {
    const result = await deleteRegister(id);
    if (result.success) {
      toast.success("Registro deletado com sucesso!");
    } else {
      toast.error("Erro ao tentar deletar registro.");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer transition delay-[1s] duration-300 ease-in-out hover:bg-transparent hover:underline hover:text-inherit"
          >
            Excluir
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-(--background) text-stone-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription className="text-stone-700">
              Essa ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-stone-600 cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="border border-stone-600 bg-stone-950 text-stone-100 hover:bg-(--custom-yellow) hover:text-stone-950 cursor-pointer "
              onClick={() => handleDelete(id)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
