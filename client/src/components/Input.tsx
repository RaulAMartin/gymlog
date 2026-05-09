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
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="
          rounded-lg
          border
          border-gray-300
          bg-white
          px-3
          py-2
          text-gray-900
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-blue-500
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-100
          dark:placeholder:text-gray-500
          dark:[color-scheme:dark]
        "
      />
    </label>
  );
}

export default Input;
