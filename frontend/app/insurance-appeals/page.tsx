import { InsuranceTabsClient } from "./InsuranceTabsClient";
import { PageContainer } from "@/components/layout/PageContainer";

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
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Insurance Appeals</h1>
      <InsuranceTabsClient data={data} />
    </PageContainer>
  );
}
