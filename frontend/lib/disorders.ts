export type DisorderRendererType = "rss" | "sga" | "temple" | "disorder";

/**
 * Maps URL slug to Strapi API endpoint, display title, and renderer type.
 * RSS, SGA, Temple use their existing Strapi content and dedicated renderers;
 * all others use the generic disorder.* components and DisorderContentRenderer.
 */
export const DISORDER_SLUG_TO_API: Record<
  string,
  { apiPath: string; title: string; type: DisorderRendererType }
> = {
  "russell-silver-syndrome": {
    apiPath: "russell-silver-syndromes",
    title: "Russell-Silver Syndrome",
    type: "rss",
  },
  "small-for-gestational-age": {
    apiPath: "small-for-gestational-ages",
    title: "Small for Gestational Age",
    type: "sga",
  },
  "temple-syndrome": {
    apiPath: "temple-syndromes",
    title: "Temple Syndrome",
    type: "temple",
  },
  "congenital-adrenal-hyperplasia": {
    apiPath: "congenital-adrenal-hyperplasias",
    title: "Congenital Adrenal Hyperplasia",
    type: "disorder",
  },
  "cushing-syndrome": {
    apiPath: "cushing-syndromes",
    title: "Cushing Syndrome",
    type: "disorder",
  },
  "growth-hormone-deficiency-children": {
    apiPath: "growth-hormone-deficiency-children",
    title: "Growth Hormone Deficiency in Children",
    type: "disorder",
  },
  "growth-hormone-deficiency-adults": {
    apiPath: "growth-hormone-deficiency-adults",
    title: "Growth Hormone Deficiency in Adults",
    type: "disorder",
  },
  "idiopathic-short-stature": {
    apiPath: "idiopathic-short-statures",
    title: "Idiopathic Short Stature",
    type: "disorder",
  },
  "insulin-like-growth-factor-deficiency": {
    apiPath: "insulin-like-growth-factor-deficiencies",
    title: "Insulin-like Growth Factor Deficiency",
    type: "disorder",
  },
  "intrauterine-growth-restriction": {
    apiPath: "intrauterine-growth-restrictions",
    title: "Intrauterine Growth Restriction",
    type: "disorder",
  },
  "mccune-albright-syndrome": {
    apiPath: "mccune-albright-syndromes",
    title: "McCune-Albright Syndrome/Fibrous Dysplasia",
    type: "disorder",
  },
  "optic-nerve-hypoplasia": {
    apiPath: "optic-nerve-hypoplasias",
    title: "Optic Nerve Hypoplasia",
    type: "disorder",
  },
  "septo-optic-dysplasia": {
    apiPath: "septo-optic-dysplasias",
    title: "Septo Optic Dysplasia",
    type: "disorder",
  },
  "panhypopituitarism-tumor": {
    apiPath: "panhypopituitarism-tumors",
    title: "Panhypopituitarism/Tumor",
    type: "disorder",
  },
  "precocious-puberty": {
    apiPath: "precocious-puberties",
    title: "Precocious Puberty",
    type: "disorder",
  },
  "thyroid-disorders": {
    apiPath: "thyroid-disorders",
    title: "Thyroid Disorders",
    type: "disorder",
  },
  "turner-syndrome": {
    apiPath: "turner-syndromes",
    title: "Turner Syndrome",
    type: "disorder",
  },
};

export function getDisorderConfig(slug: string) {
  return DISORDER_SLUG_TO_API[slug] ?? null;
}

export function buildDisorderPopulateQuery(): string {
  const populate = [
    "overviewTab",
    "overviewTab.heroSection",
    "overviewTab.heroSection.image",
    "overviewTab.contentSections",
    "overviewTab.contentSections.subsections",
    "overviewTab.contentSections.subsections.listItems",
    "overviewTab.contentSections.listItems",
    "overviewTab.faqSection",
    "overviewTab.faqSection.faqs",
    "personalStoriesTab",
    "personalStoriesTab.stories",
    "personalStoriesTab.stories.image",
    "resourcesTab",
    "resourcesTab.resourceCategories",
    "resourcesTab.resourceCategories.resources",
    "resourcesTab.resourceCategories.resources.file",
    "divisionLeadersTab",
    "divisionLeadersTab.leaders",
    "divisionLeadersTab.leaders.image",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

const RSS_OVERVIEW_SECTIONS = [
  "whatIsRss",
  "diagnosis",
  "phenotype",
  "cognitiveAbilities",
  "firstSteps",
  "hypoglycemia",
  "treatments",
  "weightManagement",
  "boneAge",
  "puberty",
  "heightImprovement",
  "growthHormoneTherapy",
  "insuranceCoverage",
  "factorsAffectingGht",
  "adulthoodHealthIssues",
] as const;

const SGA_OVERVIEW_SECTIONS = [
  "whatDoesSgaMean",
  "howDetermined",
  "assessments",
  "physicalCharacteristics",
  "firstSteps",
  "hypoglycemia",
  "treatments",
  "weightManagement",
  "boneAge",
  "puberty",
  "heightImprovement",
  "growthHormoneTherapy",
  "insuranceCoverage",
  "factorsAffectingGht",
  "adulthoodHealthIssues",
] as const;

const TEMPLE_OVERVIEW_SECTIONS = [
  "whatIsTemple",
  "diagnosis",
  "phenotype",
  "cognitiveAbilities",
  "firstSteps",
  "hypoglycemia",
  "treatments",
  "weightManagement",
  "boneAge",
  "puberty",
  "heightImprovement",
  "growthHormoneTherapy",
  "insuranceCoverage",
  "factorsAffectingGht",
  "adulthoodHealthIssues",
] as const;

export function buildRSSPopulateQuery(): string {
  const populate: string[] = [
    "overviewTab",
    "overviewTab.heroSection",
    "overviewTab.heroSection.image",
    "overviewTab.faqSection",
    "overviewTab.faqSection.faqs",
  ];
  RSS_OVERVIEW_SECTIONS.forEach((section) => {
    populate.push(`overviewTab.${section}`);
    populate.push(`overviewTab.${section}.subsections`);
    populate.push(`overviewTab.${section}.subsections.listItems`);
  });
  populate.push(
    "personalStoriesTab",
    "personalStoriesTab.stories",
    "personalStoriesTab.stories.image",
    "resourcesTab",
    "resourcesTab.resourceCategories",
    "resourcesTab.resourceCategories.resources",
    "resourcesTab.resourceCategories.resources.file",
    "divisionLeadersTab",
    "divisionLeadersTab.leaders",
    "divisionLeadersTab.leaders.image",
  );
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

export function buildSGAPopulateQuery(): string {
  const populate: string[] = [
    "overviewTab",
    "overviewTab.heroSection",
    "overviewTab.heroSection.image",
    "overviewTab.faqSection",
    "overviewTab.faqSection.faqs",
  ];
  SGA_OVERVIEW_SECTIONS.forEach((section) => {
    populate.push(`overviewTab.${section}`);
    populate.push(`overviewTab.${section}.subsections`);
    populate.push(`overviewTab.${section}.subsections.listItems`);
  });
  populate.push(
    "personalStoriesTab",
    "personalStoriesTab.stories",
    "personalStoriesTab.stories.image",
    "resourcesTab",
    "resourcesTab.resourceCategories",
    "resourcesTab.resourceCategories.resources",
    "resourcesTab.resourceCategories.resources.file",
    "divisionLeadersTab",
    "divisionLeadersTab.leaders",
    "divisionLeadersTab.leaders.image",
  );
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

export function buildTemplePopulateQuery(): string {
  const populate: string[] = [
    "overviewTab",
    "overviewTab.heroSection",
    "overviewTab.heroSection.image",
    "overviewTab.faqSection",
    "overviewTab.faqSection.faqs",
  ];
  TEMPLE_OVERVIEW_SECTIONS.forEach((section) => {
    populate.push(`overviewTab.${section}`);
    populate.push(`overviewTab.${section}.subsections`);
    populate.push(`overviewTab.${section}.subsections.listItems`);
    populate.push(`overviewTab.${section}.listItems`);
  });
  populate.push(
    "personalStoriesTab",
    "personalStoriesTab.stories",
    "personalStoriesTab.stories.image",
    "resourcesTab",
    "resourcesTab.resourceCategories",
    "resourcesTab.resourceCategories.resources",
    "resourcesTab.resourceCategories.resources.file",
    "divisionLeadersTab",
    "divisionLeadersTab.leaders",
    "divisionLeadersTab.leaders.image",
  );
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

export function buildPopulateQueryForSlug(
  slug: string,
  type: DisorderRendererType
): string {
  switch (type) {
    case "rss":
      return buildRSSPopulateQuery();
    case "sga":
      return buildSGAPopulateQuery();
    case "temple":
      return buildTemplePopulateQuery();
    default:
      return buildDisorderPopulateQuery();
  }
}
