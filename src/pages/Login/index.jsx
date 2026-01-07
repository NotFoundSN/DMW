import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "@Components";
import { useLoginMutation, useRegisterMutation } from "@Store";

export default function Unite() {

	const [typeForm, setTypeForm] = useState("login");
	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const [doLogin, resultDoLogin] = useLoginMutation();
	const [doRegister, resultDoRegister] = useRegisterMutation();

	const changeTypeForm = () => {
		setTypeForm((prev) => prev === "login" ? "register" : "login");
	};

	const formAction = (data) => {
		let body = {
			user: data.user,
			pass: data.pass
		}
		if (typeForm === "register") {
			body = {
				...body,
				name: data.firstName,
				lastName: data.lastName,
				mail: data.mail,
				pass2: data.pass2
			}
		}
		if (typeForm === "login") {
			doLogin(body);
		} else {
			doRegister(body);
		}	
		console.log(body);
	};

	return (
		<>
			<form
				className=" bg-purple-op mt-8 p-4 rounded-lg w-4/5 max-w-xl"
				onSubmit={handleSubmit(formAction)}>
				<Input
					type="text"
					name="user"
					label="Usuario"
					register={register}
					errors={errors}
				/>
				{typeForm === "register" && (<>
					<Input
						type="text"
						name="firstName"
						label="Nombre"
						register={register}
						errors={errors}
					/>
					<Input
						type="text"
						name="lastName"
						label="Apellido"
						register={register}
						errors={errors}
					/>
					<Input
						type="text"
						name="mail"
						label="E-Mail"
						register={register}
						errors={errors}
					/>
				</>)}
				<Input
					type="password"
					name="pass"
					label="Contraseña"
					register={register}
					errors={errors}
				/>
				{typeForm === "register" && (<>
					<Input
						type="password"
						name="pass2"
						label="Confirmar"
						register={register}
						errors={errors}
					/>
				</>)}
				<div className="flex flex-col justify-center items-center gap-2">
					<Button name={`${typeForm === "register" ? "Crear cuenta" : "Login"}`} />
					<Button
						name={`${typeForm === "register" ? "ya tengo cuenta" : "crear nueva"}`}
						type="button"
						className=" font-bold text-lg text-white rounded-md drop-shadow-text px-2 underline"
						onClick={changeTypeForm} />
				</div>
			</form>
		</>
	);
}
