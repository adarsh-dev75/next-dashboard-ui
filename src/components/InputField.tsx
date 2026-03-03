import { FieldError } from 'react-hook-form';

type InputFieldProps = {
  type?: string;
  label: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  type = 'text',
  label,
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-4 w-full md:w-1/4">
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        defaultValue={defaultValue}
        className="ring-[1.5px] ring-gray-300 outline-none p-2 text-sm w-full"
        {...inputProps}
      />
      {error?.message && (
        <p className="text-red-400 text-xs">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;
