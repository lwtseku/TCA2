import React from "react";

interface RadioGroupProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
}) => {
  return (
    <div role="radiogroup" className="space-y-2">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        return React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: onChange,
        });
      })}
    </div>
  );
};

export const RadioItem: React.FC<{
  id: string;
  value: string;
  name: string;
  label: string;
}> = ({ id, value, name, label, ...props }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="radio"
      value={value}
      name={name}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      {...props}
    />
    <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
      {label}
    </label>
  </div>
);
