import { ResourcesTabsClient } from "./ResourcesTabsClient";
import { PageContainer } from "@/components/layout/PageContainer";

function buildResourcesPopulateQuery(): string {
  const populate = [
    "overviewTab",
    "overviewTab.brochureAccordionItems",
    "overviewTab.adultBrochuresAccordionItems",
    "overviewTab.additionalInfoAccordionItems",
    "overviewTab.overviewInfoSections",
    "overviewTab.overviewInfoSections.links",
    "overviewTab.parentsGroups",
    "overviewTab.adultsGroups",
    "informationalVideosTab",
    "informationalVideosTab.videos",
    "informationalVideosTab.videos.thumbnail",
    "getSupportTab",
    "spreadTheWordTab",
    "spreadTheWordTab.items",
    "spreadTheWordTab.items.image",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getResourcesData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildResourcesPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/resources-pages?${populateQuery}&filters[slug][$eq]=main`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.data ?? data;
    const list = Array.isArray(raw) ? raw : [raw];
    // Strapi 5: flattened (r.slug); Strapi 4: r.attributes.slug
    const resource =
      list.find(
        (r: { slug?: string; attributes?: { slug?: string } }) =>
          r?.slug === "main" || r?.attributes?.slug === "main",
      ) ?? list[0];
    // Strapi 5 returns flat object; Strapi 4 wraps in attributes
    return resource ? (resource.attributes ?? resource) : null;
  } catch {
    return null;
  }
}

export default async function ResourcesPage() {
  const data = await getResourcesData();

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Resources</h1>
      <ResourcesTabsClient data={data} />
    </PageContainer>
  );
}
