import Link from "next/link";
import { getRegisters } from "@/lib/actions";
import { DeleteRegister } from "@/components/ui/DeleteRegister";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const dynamic = "force-dynamic";

export default async function Page() {
  const registers = await getRegisters();

  return (
    <main>
      <div className="rounded-lg border border-(--color-border) shadow-md p-6 text-stone-700 bg-(--color-accent-foreground)">
        <h1 className={`mb-4 text-xl md:text-2xl text-(--custom-yellow)`}>
          Dashboard
        </h1>
        <p className="text-foreground font-light">
          Centraliza e documenta todas as movimentações de Inbound e Outbound,
          oferecendo visibilidade total do fluxo logístico, redução de erros
          operacionais e maior confiabilidade nas informações.
        </p>
      </div>
      <div className="relative rounded-lg border border-(--color-border) shadow-lg overflow-x-auto mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-base text-stone-100 bg-sidebar rounded-t-lg">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Operação
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Pedido
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Origem
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Destino
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Data
              </th>
              <th scope="col" className="px-6 py-3 font-medium"></th>
              <th
                scope="col"
                className="px-6 py-3 font-medium rounded-tr-lg"
              ></th>
            </tr>
          </thead>
          <tbody className="text-stone-400">
            {registers &&
              registers.map((register) => (
                <tr
                  key={register.id}
                  className="border border-(--color-border) last:border-none bg-(--color-accent-foreground)"
                >
                  <td className="px-6 py-4">{register.id}</td>
                  <td
                    className={clsx("px-6 py-4 font-semibold text-lime-300", {
                      "text-rose-300": register.type_operation === "outbound",
                    })}
                  >
                    {register.type_operation}
                  </td>
                  <td className="px-6 py-4">{register.order_code}</td>
                  <td className="px-6 py-4">{register.origin_location}</td>
                  <td className="px-6 py-4">{register.delivery_location}</td>
                  <td className="px-6 py-4">
                    {register.created_at?.toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <PencilSquareIcon className="w-4" />
                      <Link
                        href={`/dashboard/record/${register.id}`}
                        className="flex gap-2 items-center cursor-pointer transition delay-[1s] duration-300 ease-in-out hover:bg-transparent hover:underline hover:text-inherit"
                      >
                        Editar
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <TrashIcon className="w-4" />
                      <DeleteRegister id={register.id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
