import FormRecord from "@/components/layout/FormRecord";

export default async function Page() {
  return (
    <main>
      <div className="rounded-lg border border-(--color-border) shadow-md p-6 text-stone-700 bg-(--color-accent-foreground)">
        <h1 className={`mb-4 text-xl md:text-2xl text-(--custom-yellow)`}>
          Registrar Movimentação
        </h1>
        <p className="text-foreground font-light">
          Cadastre uma nova movimentação para registrar a operação logística.
        </p>
      </div>
      <FormRecord />
    </main>
  );
}
