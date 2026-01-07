import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "@Components";

const tablaClones = [
	[3, 15, 2, 12, 2],
	[6, 30, 4, 24, 4],
	[9, 45, 6, 36, 6],
	[14, 70, 9, 56, 9],
	[19, 95, 12, 76, 12],
	[24, 120, 15, 96, 15],
	[34, 170, 21, 136, 19],
	[44, 220, 27, 176, 23],
	[54, 270, 33, 216, 27],
	[69, 345, 42, 276, 31],
	[84, 420, 51, 336, 35],
	[99, 495, 60, 396, 39],
	[114, 570, 69, 456, 44],
	[129, 645, 78, 516, 49],
	[144, 720, 87, 596, 54],
];

export default function Clones() {
	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const validation = {
		select: {
			required: { value: true, message: "Campo requerido" },
		},
		text: {
			required: { value: true, message: "Campo requerido" },
			pattern: {
				value: /^[+-]?([0-9]+([,.][0-9]*)?|[,.][0-9]+)$/,
				message: "Ingrese un número válido",
			},
		},
	};

	const [calculated, setCalculated] = useState(null);
	const [expected, setExpected] = useState(null);

	const calcularClon = (data) => {
		const valores = {
			cantClon: parseInt(data.cantClon),
			clonBase: parseFloat(data.clonBase),
			clonCloned: parseFloat(data.clonCloned),
			typeClon: parseInt(data.typeClon),
		};
		setCalculated(
			valores.typeClon != 2
				? ((valores.clonCloned / valores.clonBase) * 100).toFixed(2)
				: valores.clonCloned
		);
		setExpected(tablaClones[valores.cantClon][valores.typeClon]);
	};

	const typeClonList = [
		{ value: 0, text: "Ataque" },
		{ value: 1, text: "Critico" },
		{ value: 2, text: "Bloqueo" },
		{ value: 3, text: "Evasion" },
		{ value: 4, text: "Vida" },
	];
	const cantClonList = [
		{ value: 0, text: "1" },
		{ value: 1, text: "2" },
		{ value: 2, text: "3" },
		{ value: 3, text: "4" },
		{ value: 4, text: "5" },
		{ value: 5, text: "6" },
		{ value: 6, text: "7" },
		{ value: 7, text: "8" },
		{ value: 8, text: "9" },
		{ value: 9, text: "10" },
		{ value: 10, text: "11" },
		{ value: 11, text: "12" },
		{ value: 12, text: "13" },
		{ value: 13, text: "14" },
		{ value: 14, text: "15" },
	];
	return (
		<>
			<form
				className=" bg-purple-op mt-8 p-4 rounded-lg w-4/5 max-w-xl"
				onSubmit={handleSubmit(calcularClon)}
			>
				<Input
					type="select"
					name="typeClon"
					label="Tipo de clon"
					register={register}
					list={typeClonList}
				/>
				<Input
					type="select"
					name="cantClon"
					label="Cantidad de clones"
					list={cantClonList}
					register={register}
				/>
				<Input
					type="text"
					name="clonBase"
					label="Stat base"
					register={register}
					validation={validation.text}
					errors={errors}
				/>
				<Input
					type="text"
					name="clonCloned"
					label="Stat clonado"
					register={register}
					validation={validation.text}
					errors={errors}
				/>
				<div className="flex flex-row justify-center">
					<Button name="Calcular" />
				</div>
			</form>
			{calculated > 0 ? (
				<div className=" bg-purple-op mt-4 p-4 rounded-lg w-4/5 max-w-xl">
					{expected == calculated ? (
						<p className="text-white text-[1.5rem] font-bold text-center drop-shadow-text rotate-[720deg] duration-1000">
							Perfecto
						</p>
					) : calculated < expected ? (
						<>
							<p className="text-white text-[1.5rem] font-bold drop-shadow-text">
								{`Estas un ${(
									100 -
									(calculated * 100) / expected
								).toFixed(2)}% por debajo del perfecto`}
							</p>
							<p className="text-white text-[1.5rem] font-bold drop-shadow-text">
								{`Tenes ${calculated} de ${expected} que es el perfecto`}
							</p>
						</>
					) : (
						<p className="text-white text-[1.5rem] font-bold drop-shadow-text text-center">
							Mal ingreso de datos
						</p>
					)}
				</div>
			) : (
				""
			)}
		</>
	);
}
