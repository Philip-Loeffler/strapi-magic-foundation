import { InsuranceTabsClient } from "./InsuranceTabsClient";

function buildInsuranceAppealsPopulateQuery(): string {
  const populate = [
    "overviewTab",
    "overviewTab.accordionSections",
    "faqTab",
    "faqTab.faqItems",
    "appealProcessTab",
    "appealProcessTab.listItems",
    "followUpProcedureTab",
    "followUpProcedureTab.hipaaFormFile",
    "patientAssistanceTab",
    "patientAssistanceTab.testimonials",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getInsuranceAppealsData() {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildInsuranceAppealsPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/insurance-appeals?${populateQuery}`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? data;
  } catch {
    return null;
  }
}

export default async function InsurancePage() {
  const data = await getInsuranceAppealsData();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold">Insurance Appeals</h1>
        </div>
        <InsuranceTabsClient data={data} />
      </div>
    </div>
  );
}
