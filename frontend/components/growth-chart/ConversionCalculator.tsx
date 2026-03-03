"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { useState, useMemo } from "react";

const lengthUnits = {
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  feet: 0.3048,
  yard: 0.9144,
} as const;

type LengthUnit = keyof typeof lengthUnits;

function convertLength(value: number, from: LengthUnit, to: LengthUnit) {
  const valueInMeters = value * lengthUnits[from];
  return valueInMeters / lengthUnits[to];
}

export default function ConversionCalculator({
  embedded,
}: {
  embedded?: boolean;
}) {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<LengthUnit>("centimeter");
  const [toUnit, setToUnit] = useState<LengthUnit>("meter");

  const result = useMemo(() => {
    if (Number.isNaN(value)) return 0;
    return convertLength(value, fromUnit, toUnit);
  }, [value, fromUnit, toUnit]);

  const content = (
    <div className="max-w-md space-y-4">
        {/* Quantity */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="border rounded px-3 py-2"
          />
        </div>

        {/* From */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as LengthUnit)}
            className="border rounded px-3 py-2"
          >
            {Object.keys(lengthUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as LengthUnit)}
            className="border rounded px-3 py-2"
          >
            {Object.keys(lengthUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">Result</div>
          <div className="text-xl font-semibold">{result.toLocaleString()}</div>
        </div>
      </div>
  );

  if (embedded) return content;
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Resources</h1>
      {content}
    </PageContainer>
  );
}
