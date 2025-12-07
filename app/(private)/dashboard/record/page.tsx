import FormRecord from "@/components/layout/FormRecord";

export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Registrar Movimentação</h1>
      <FormRecord />
    </main>
  );
}
