// src/components/ui/card.tsx
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div className={`bg-white rounded-2xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({
  className = "",
  children,
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
