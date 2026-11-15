"use client";

import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <Input
      placeholder="Buscar produto..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
