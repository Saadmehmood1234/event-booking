interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: { message?: string };
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium">{label}</label>
    <textarea
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
      {...props}
    />
    {error?.message && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
