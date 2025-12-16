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
      <div className="rounded-lg border border-(--color-border) shadow-md p-6 text-stone-700 bg-(--color-accent-foreground)">
        <h1 className={`mb-4 text-xl md:text-2xl text-(--custom-yellow)`}>
          Informações do registro
        </h1>
        <p className="text-foreground font-light">
          Editar informações do registro: {register?.id}
        </p>
      </div>
      {register && <FormUpdateRecord data={register} />}
    </main>
  );
}
