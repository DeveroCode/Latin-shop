type LabelTextProps = {
  children: React.ReactNode;
  id: string;
};

export default function LabelText({ children, id }: LabelTextProps) {
  return (
    <label htmlFor={id} className="text-gray-600 font-semibold">
      {children}
    </label>
  );
}
