import { PageContainer } from "@/components/layout/PageContainer";
import { EmergencyContent } from "./EmergencyContent";

function buildEmergencyPopulateQuery(): string {
  const populate = [
    "emergencyAccordion",
    "emergencyAccordion.geneticDisorderResponse",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getEmergencyData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!strapiUrl) return null;
    const populateQuery = buildEmergencyPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/emergencies?${populateQuery}`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.data ?? data;
    const list = Array.isArray(raw) ? raw : [raw];
    const entry = list[0];
    return entry ? (entry.attributes ?? entry) : null;
  } catch {
    return null;
  }
}

export default async function EmergencyPage() {
  const emergency = await getEmergencyData();

  const description =
    emergency?.description ?? emergency?.overView ?? null;
  const accordionItems = emergency?.emergencyAccordion ?? [];

  const pageTitle = emergency?.title;

  return (
    <PageContainer>
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <h1 className="text-3xl font-bold text-left w-full">
          {pageTitle ?? (
            <>
              Have <span className="text-primaryOrange">Emergency?</span> We
              are here to help.
            </>
          )}
        </h1>

        {description && (
          <div className="text-left w-full text-muted-foreground">
            {description}
          </div>
        )}

        <div className="w-full max-w-2xl flex flex-col gap-6">
          <EmergencyContent accordionItems={accordionItems} />
        </div>
      </div>
    </PageContainer>
  );
}
