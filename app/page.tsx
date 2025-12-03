import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen dark:bg-(--background) font-sans">
      <main className="relative flex flex-col-reverse items-center md:flex-row w-full max-w-[1280px] mx-auto">
        <div className="row items-center py-5 md:w-6/12 md:pb-20 md:pt-10">
          <div className="text-left space-y-3">
            <h1 className="text-4xl font-medium leading-none md:text-6xl text-center md:text-left text-stone-950">
              ZYX Logística
            </h1>
            <p className="mt-6 mb-8 text-lg font-normal leading-7 sm:mb-12 text-center md:text-left md:pr-12 text-stone-900">
              O sucesso da sua operação logística depende de agilidade, precisão
              e controle total. Chega de planilhas desorganizadas e comunicação
              fragmentada!
            </p>
            <div className="w-full justify-center md:justify-start items-center inline-flex">
              <Link
                className={`px-8 py-5 bg-(--custom-yellow) w-full md:w-1/2 font-semibold uppercase rounded-xl hover:bg-(--custom-red) transition duration-300 ease-in-out text-stone-950 hover:text-gray-200 text-center leading-7 shadow-md`}
                href={"/dashboard"}
                rel="noopener noreferrer"
              >
                Explorar
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center py-5 md:w-6/12 md:pb-20 md:pt-10">
          <Image
            src="/ilustracao-logistica-caminhao.png"
            alt="Ilustração para representar um caminhão de entrega - empresa logística"
            width={500}
            height={500}
            priority
          />
        </div>
      </main>
    </div>
  );
}
