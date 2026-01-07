import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useState } from "react";

const text = ({
	type,
	name,
	label,
	register,
	validation = null,
	errors,
	...otherProps
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const changePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	return (
		<div className="flex flex-row w-full my-1">
			<div className="w-1/2">
				<label
					htmlFor={name}
					className="w-1/2 text-white text-[1.5rem] font-bold drop-shadow-text"
				>
					{label}
				</label>
			</div>

			<div className="w-1/2 flex flex-row">
				<input
					type={!showPassword ? type : "text"}
					name={name}
					id={name}
					className={`${type == "password" ? "w-5/6" : "w-full"} text-center bg-purple-light border ${errors[name] && "border-red"} font-bold text-[1.5rem]`}
					{...(validation ? register(name, validation) : register(name))}
					{...otherProps}
				/>
				{type == "password" && (<div className="bg-purple-lightOp text-3xl w-1/6 flex items-center justify-center" onClick={changePasswordVisibility}>
					{!showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
				</div>)}
			</div>
		</div>
	);
};

const select = ({
	name,
	label,
	list,
	register,
	validation = null,
	...otherProps
}) => {
	return (
		<div className="flex flex-row w-full my-1">
			<label
				htmlFor={name}
				className="w-1/2 text-white text-[1.5rem] font-bold drop-shadow-text"
			>
				{label}
			</label>
			<select
				name={name}
				id={name}
				className="w-1/2 text-center bg-purple-light border font-bold text-[1.5rem]"
				{...(validation ? register(name, validation) : register(name))}
				{...otherProps}
			>
				{list.map((element, index) => {
					return (
						<option value={element.value} className="text-center font-bold" key={`select-${name}-${index}`}>{element.text}</option>
					);
				})}
			</select>
		</div>
	);
};

const Input = ({ type, name, label, register, validation, errors, ...otherProps }) => {
	const inputList = {
		text: text,
		number: text,
		select: select,
		password: text,
	};
	const SelectedInput = inputList[type];

	return (
		<SelectedInput
			type={type}
			name={name}
			label={label}
			register={register}
			validation={validation}
			errors={errors}
			{...otherProps}
		/>
	);
};

export default Input;
