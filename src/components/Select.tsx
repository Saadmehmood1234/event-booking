interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: { message?: string };
}

export const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-purple-600">{label}</label>
    <select
      className="w-full text-purple-600 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-purple-600">
          {option.label}
        </option>
      ))}
    </select>
    {error?.message && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
