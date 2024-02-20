import { ReactNode } from "react";

interface LabeledOptionProps {
  label: string;
  onChange: () => void;
  alignment?: "vertical" | "horizontal";
  children: ReactNode; // Add children here
}

const LabeledOption: React.FC<LabeledOptionProps> = ({
  label,
  onChange,
  alignment = "horizontal",
  children,
}) => {
  const handleChange = () => {
    onChange();
  };

  const alignmentClass = alignment === "vertical" ? "flex-col gap-2" : "flex-row items-center justify-between";

  return (
    <div className={`flex ${alignmentClass}`}>
      <h1>{label}</h1>
      {children}
    </div>
  );
};

export default LabeledOption;
