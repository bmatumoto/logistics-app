import { getRegister } from "@/lib/actions";
import FormUpdateRecord from "@/components/layout/FormUpdateRecord";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const register = await getRegister(id);

  return (
    <main className="font-sans">
      <div className="bg-[#f2f2f2] rounded-lg border border-stone-200 p-6 text-stone-700">
        <h1 className={`mb-4 text-xl md:text-2xl`}>Informações do registro</h1>
        <p>Editar informações do registro: {register?.id}</p>
      </div>
      {register && <FormUpdateRecord data={register} />}
    </main>
  );
}
