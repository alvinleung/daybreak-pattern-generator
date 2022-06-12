export const TextInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => (
  <input
    {...props}
    className="px-[.5em] py-[.25em] rounded-sm bg-[transparent]"
  />
);

type FieldProps = {
  children: React.ReactNode;
  label: string;
};
export const Field = ({ children, label }: FieldProps) => {
  return (
    <label className="flex text-sm">
      <div className="mr-[.5em] opacity-50 py-[.25em]">{label}</div>
      {children}
    </label>
  );
};
