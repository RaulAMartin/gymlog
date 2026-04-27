type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
};

function Input({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />
    </label>
  );
}

export default Input;
