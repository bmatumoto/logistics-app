import Link from "next/link";
import { getRegisters } from "@/lib/actions";
import { DeleteRegister } from "@/components/ui/DeleteRegister";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

export default async function Page() {
  const registers = await getRegisters();

  return (
    <main>
      <div className="bg-[#f2f2f2] rounded-lg border border-stone-200 p-6 text-stone-700">
        <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
        <p>
          Centraliza e documenta todas as movimentações de Inbound e Outbound,
          oferecendo visibilidade total do fluxo logístico, redução de erros
          operacionais e maior confiabilidade nas informações.
        </p>
      </div>
      <div className="relative rounded-lg border border-stone-900 overflow-x-auto mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-base text-stone-100 bg-stone-800 rounded-t-lg">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium rounded-tl-lg">
                ID
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
          <tbody>
            {registers &&
              registers.map((register) => (
                <tr
                  key={register.id}
                  className="border-b border-stone-900 last:border-none"
                >
                  <td className="px-6 py-4">{register.id}</td>
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
                        className="flex gap-2 items-center"
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
