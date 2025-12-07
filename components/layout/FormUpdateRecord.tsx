"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";
import { updateRegister } from "@/lib/actions";
import {
  SelectCombinedRegisterInput,
  insertCombinedRegisterSchema,
} from "@/db/schema/index";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CubeIcon,
  TruckIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type FormInput = z.input<typeof insertCombinedRegisterSchema>;
type FormOutput = z.output<typeof insertCombinedRegisterSchema>;

export default function FormUpdateRecord({
  data,
}: {
  data: SelectCombinedRegisterInput;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(insertCombinedRegisterSchema),
    defaultValues: {
      type_operation: data?.type_operation || "inbound",
      delivery_location: data?.delivery_location || "",
      origin_location: data?.origin_location || "",
      order_code: data?.order_code || "",
      itens:
        data?.itens?.length > 0
          ? data.itens
          : [{ product_id: "", quantity: 0 }],
    },
  });

  const locais = [
    { id: "A500CF", nome: "Armazém Central", tipo: "armazém" },
    { id: "FM100200", nome: "Fornecedor Master", tipo: "fornecedor" },
    { id: "CXYZ455", nome: "Cliente XYZ", tipo: "cliente" },
    { id: "FLL3V1A", nome: "Filial Louveira", tipo: "filial" },
  ];

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const resetData = {
        type_operation: data?.type_operation || "inbound",
        delivery_location: data?.delivery_location || "",
        origin_location: data?.origin_location || "",
        order_code: data?.order_code || "",
        itens:
          data?.itens?.length > 0
            ? data.itens
            : [{ product_id: "", quantity: 0 }],
      };
      reset(resetData);
    }
  }, [data, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const onSubmit: SubmitHandler<FormInput> = async (formData) => {
    const response = await updateRegister(data.id, formData as FormOutput);

    if (response?.success) {
      alert("Movimentação atualizada com sucesso!");
      redirect("/dashboard");
    }
  };

  const addItem = () => {
    append({ product_id: "", quantity: 0 });
  };

  const uuidMock = [
    "22520f32-5183-4d7f-b8a1-f5b56ee3f2df",
    "2c54c624-7df3-4ced-919c-541d010ff121",
    "67c37298-05cc-49e9-8794-35c35f35ced1",
    "b07fc6ec-9b22-450f-bb77-201ba89435f3",
  ];

  return (
    <div className="mt-8">
      <div className="bg-[#f2f2f2] rounded-lg border border-stone-200 p-6">
        {/* Tipo de Operação */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-stone-700">
            Tipo de Operação
          </h3>
          <div className="flex gap-4 text-stone-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="inbound"
                {...register("type_operation")}
                className="w-4 h-4"
              />
              <CubeIcon className="w-6 text-blue-600" />
              <span className="font-medium">Inbound (Entrada)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="outbound"
                {...register("type_operation")}
                className="w-4 h-4"
              />
              <TruckIcon className="w-6 text-green-600" />
              <span className="font-medium">Outbound (Saída)</span>
            </label>
          </div>
          {errors.type_operation && (
            <p className="text-red-600 text-sm mt-2">
              {errors.type_operation.message}
            </p>
          )}
        </div>

        {/* Dados da Movimentação */}
        <div className="my-8">
          <h3 className="text-lg font-bold mb-4 text-stone-700">
            Dados da Movimentação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-stone-600">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Local Origem *
              </label>
              <select
                {...register("origin_location")}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {locais.map((local) => (
                  <option key={local.id} value={local.id}>
                    {local.nome} ({local.tipo})
                  </option>
                ))}
              </select>
              {errors.origin_location && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.origin_location.message}
                </p>
              )}
            </div>
            <div className="text-stone-600">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Local Destino *
              </label>
              <select
                {...register("delivery_location")}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {locais.map((local) => (
                  <option key={local.id} value={local.id}>
                    {local.nome} ({local.tipo})
                  </option>
                ))}
              </select>
              {errors.delivery_location && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.delivery_location.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2 text-stone-600">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Número da Nota Fiscal (NF, Pedido, etc.)
              </label>
              <input
                type="text"
                {...register("order_code")}
                placeholder="NF-12345"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.order_code && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.order_code.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Itens da Movimentação */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-stone-700">Itens da Carga</h3>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"
            >
              <PlusIcon className="w-6" />
              Adicionar Item
            </button>
          </div>
          {errors.itens && !Array.isArray(errors.itens) && (
            <p className="text-red-600 text-sm mb-4">{errors.itens.message}</p>
          )}

          <div className="space-y-4">
            <div className="p-4 border border-yellow-400 rounded-lg">
              <p className="text-sm font-semibold text-stone-900">
                ID de Produtos para usar de exemplo
              </p>
              <div className="flex flex-wrap gap-4 w-full">
                {uuidMock.map((uuid) => (
                  <p key={uuid} className="text-xs text-stone-900 w-auto">
                    {uuid}
                  </p>
                ))}
              </div>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-start rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 text-stone-600">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Produto - Código *
                    </label>
                    <input
                      type="text"
                      {...register(`itens.${index}.product_id`)}
                      placeholder="A10200BF3"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.itens?.[index]?.product_id && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.itens[index]?.product_id?.message}
                      </p>
                    )}
                  </div>
                  <div className="text-stone-600">
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Quantidade *
                    </label>
                    <input
                      type="number"
                      step="1"
                      {...register(`itens.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.itens?.[index]?.quantity && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.itens[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-7 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Remover item"
                  >
                    <TrashIcon className="w-6" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botão Submit */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium cursor-pointer"
          >
            Atualizar Movimentação
          </button>
        </div>
      </div>
    </div>
  );
}
