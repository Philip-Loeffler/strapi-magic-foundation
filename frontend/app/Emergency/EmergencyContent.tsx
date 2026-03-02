"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export type EmergencyAccordionItem = {
  geneticDisorderName: string;
  geneticDisorderResponse?: Array<{
    geneticRsponseTitle: string;
    geneticRsponseAnswer: string;
  }>;
};

type EmergencyContentProps = {
  accordionItems: EmergencyAccordionItem[];
};

export function EmergencyContent({ accordionItems }: EmergencyContentProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return accordionItems ?? [];
    const q = search.trim().toLowerCase();
    return (accordionItems ?? []).filter((item) =>
      item.geneticDisorderName?.toLowerCase().includes(q)
    );
  }, [accordionItems, search]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search disorders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search emergency accordion"
        />
      </div>

      {filtered.length > 0 ? (
        <Accordion className="w-full" type="single" collapsible>
          {filtered.map((item, i) => (
            <AccordionItem
              key={item.geneticDisorderName ?? i}
              value={item.geneticDisorderName ?? `item-${i}`}
            >
              <AccordionTrigger className="text-left">
                {item.geneticDisorderName}
              </AccordionTrigger>
              <AccordionContent className="pl-6 space-y-2">
                <ul className="list-none space-y-2 pl-0">
                  {item.geneticDisorderResponse?.map((entry, j) => (
                    <li key={j} className="pl-0">
                      <span className="font-bold">
                        {entry.geneticRsponseTitle}
                      </span>
                      : {entry.geneticRsponseAnswer}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-muted-foreground">No matching disorders.</p>
      )}
    </div>
  );
}
