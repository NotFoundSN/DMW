const normalButton = ({ name, ...otherProps }) => {
	return (
		<button className=" bg-purple-blue mt-2 px-4 py-2 drop-shadow-button rounded hover:bg-purple hover:resize-[105%] w-1/2 border border-purple-blue hover:border-white">
			<span className=" text-white drop-shadow-text font-bold text-[1.2rem]">{name}</span>
		</button>
	);
};

const otherButton = ({ name, ...otherProps }) => {
	return <button {...otherProps}>{name}</button>;
};

const Input = ({ name, type = "normal", ...otherProps }) => {
	const buttonList = {
		normal: normalButton,
		button: otherButton,
		//number: text,
		//: select,
	};
	const SelectedButton = buttonList[type];

	return <SelectedButton type={type} name={name} {...otherProps} />;
};

export default Input;
