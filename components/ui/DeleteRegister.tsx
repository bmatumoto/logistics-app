"use client";

import { deleteRegister } from "@/lib/actions";

export function DeleteRegister({ id }: { id: string }) {
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    const result = await deleteRegister(id);
    if (result.success) {
      alert("Registro deletado com sucesso!");
    } else {
      alert(result.error);
    }
  };

  return (
    <button onClick={() => handleDelete(id)} className="cursor-pointer">
      Excluir
    </button>
  );
}
