import Link from "next/link";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

type DisorderItem = {
  name: string;
  href?: string;
};

type DisorderColumn = {
  [key: string]: DisorderItem[];
};

// All disorders with their routes (RSS, SGA, Temple use existing routes; rest use /disorders/[slug])
const DISORDER_ROUTES: Record<string, string> = {
  "Congenital Adrenal Hyperplasia": "/disorders/congenital-adrenal-hyperplasia",
  "Cushing Syndrome": "/disorders/cushing-syndrome",
  "Growth Hormone Deficiency in Children": "/disorders/growth-hormone-deficiency-children",
  "Growth Hormone Deficiency in Adults": "/disorders/growth-hormone-deficiency-adults",
  "Idiopathic Short Stature": "/disorders/idiopathic-short-stature",
  "Insulin-like Growth Factor Deficiency": "/disorders/insulin-like-growth-factor-deficiency",
  "Intrauterine Growth Restriction": "/disorders/intrauterine-growth-restriction",
  "McCune-Albright Syndrome/Fibrous Dysplasia": "/disorders/mccune-albright-syndrome",
  "Optic Nerve Hypoplasia": "/disorders/optic-nerve-hypoplasia",
  "Septo Optic Dysplasia": "/disorders/septo-optic-dysplasia",
  "Panhypopituitarism/Tumor": "/disorders/panhypopituitarism-tumor",
  "Precocious Puberty": "/disorders/precocious-puberty",
  "Russell-Silver Syndrome": "/disorders/russell-silver-syndrome",
  "Small for Gestational Age": "/disorders/small-for-gestational-age",
  "Thyroid Disorders": "/disorders/thyroid-disorders",
  "Temple Syndrome": "/disorders/temple-syndrome",
  "Turner Syndrome": "/disorders/turner-syndrome",
};

function getDisorderHref(name: string): string {
  return DISORDER_ROUTES[name] ?? "#";
}

const disorderList: DisorderColumn = {
  col1: [
    { name: "Congenital Adrenal Hyperplasia" },
    { name: "Cushing Syndrome" },
    { name: "Growth Hormone Deficiency in Children" },
    { name: "Growth Hormone Deficiency in Adults" },
    { name: "Idiopathic Short Stature" },
    { name: "Insulin-like Growth Factor Deficiency" },
  ],
  col2: [
    { name: "Intrauterine Growth Restriction" },
    { name: "McCune-Albright Syndrome/Fibrous Dysplasia" },
    { name: "Optic Nerve Hypoplasia" },
    { name: "Septo Optic Dysplasia" },
    { name: "Panhypopituitarism/Tumor" },
  ],
  col3: [
    { name: "Precocious Puberty" },
    { name: "Russell-Silver Syndrome" },
    { name: "Small for Gestational Age" },
    { name: "Thyroid Disorders" },
    { name: "Temple Syndrome" },
    { name: "Turner Syndrome" },
  ],
};

export default function Page() {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-center w-full h-full pt-20">
        <div className="flex flex-col w-full justify-center items-center gap-8 max-w-4xl">
          <div className="text-3xl font-bold text-center">
            Understanding{" "}
            <span className="text-primary">Growth and Hormonal</span>{" "}
            Disorders
          </div>
          <div className="text-center text-muted-foreground">
            Growth and hormonal disorders can significantly impact a child&apos;s
            physical and emotional development. At The MAGIC Foundation, we are
            committed to providing comprehensive information and support to
            families navigating these challenges.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-2 w-full">
            {Object.keys(disorderList).map((colKey) => (
              <div key={colKey} className="flex flex-col space-y-4">
                {disorderList[colKey].map((item) => {
                  const href = getDisorderHref(item.name);
                  const isLinked = href !== "#";
                  return (
                    <Link
                      key={item.name}
                      href={href}
                      className={`${navigationMenuTriggerStyle()} flex flex-row items-center transition-colors ${
                        isLinked
                          ? "text-primary hover:underline hover:text-primary/90"
                          : "text-muted-foreground cursor-default"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
