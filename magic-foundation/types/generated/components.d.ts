import type { Schema, Struct } from '@strapi/strapi';

export interface EmergencyEmergencyAccordionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_emergency_emergency_accordion_items';
  info: {
    description: 'An accordion item for a genetic disorder';
    displayName: 'Emergency Accordion Item';
  };
  attributes: {
    geneticDisorderName: Schema.Attribute.String & Schema.Attribute.Required;
    geneticDisorderResponse: Schema.Attribute.Component<
      'emergency.genetic-disorder-response',
      true
    >;
  };
}

export interface EmergencyGeneticDisorderResponse
  extends Struct.ComponentSchema {
  collectionName: 'components_emergency_genetic_disorder_responses';
  info: {
    description: 'A Q&A response item for an emergency accordion';
    displayName: 'Genetic Disorder Response';
  };
  attributes: {
    geneticRsponseAnswer: Schema.Attribute.Text & Schema.Attribute.Required;
    geneticRsponseTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RssContentSection extends Struct.ComponentSchema {
  collectionName: 'components_rss_content_sections';
  info: {
    description: 'A content section with title and rich text content';
    displayName: 'RSS Content Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    subsections: Schema.Attribute.Component<'rss.content-subsection', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RssContentSubsection extends Struct.ComponentSchema {
  collectionName: 'components_rss_content_subsections';
  info: {
    description: 'A subsection within a content section';
    displayName: 'RSS Content Subsection';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<'rss.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface RssDivisionLeader extends Struct.ComponentSchema {
  collectionName: 'components_rss_division_leaders';
  info: {
    description: 'A division leader or consultant';
    displayName: 'RSS Division Leader';
  };
  attributes: {
    bio: Schema.Attribute.RichText;
    email: Schema.Attribute.Email;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    specializations: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface RssDivisionLeadersTab extends Struct.ComponentSchema {
  collectionName: 'components_rss_division_leaders_tabs';
  info: {
    description: 'Content for the Division Leaders tab';
    displayName: 'RSS Division Leaders Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    leaders: Schema.Attribute.Component<'rss.division-leader', true>;
    title: Schema.Attribute.String;
  };
}

export interface RssFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_rss_faq_items';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'RSS FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface RssFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_rss_faq_sections';
  info: {
    description: 'FAQ section with questions and answers';
    displayName: 'RSS FAQ Section';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'rss.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface RssHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_rss_hero_sections';
  info: {
    description: 'Hero section with title and image';
    displayName: 'RSS Hero Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RssListItem extends Struct.ComponentSchema {
  collectionName: 'components_rss_list_items';
  info: {
    description: 'A single list item';
    displayName: 'RSS List Item';
  };
  attributes: {
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface RssOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_rss_overview_tabs';
  info: {
    description: 'Content for the Overview tab';
    displayName: 'RSS Overview Tab';
  };
  attributes: {
    adulthoodHealthIssues: Schema.Attribute.Component<
      'rss.content-section',
      false
    >;
    boneAge: Schema.Attribute.Component<'rss.content-section', false>;
    cognitiveAbilities: Schema.Attribute.Component<
      'rss.content-section',
      false
    >;
    diagnosis: Schema.Attribute.Component<'rss.content-section', false>;
    factorsAffectingGht: Schema.Attribute.Component<
      'rss.content-section',
      false
    >;
    faqSection: Schema.Attribute.Component<'rss.faq-section', false>;
    firstSteps: Schema.Attribute.Component<'rss.content-section', false>;
    growthHormoneTherapy: Schema.Attribute.Component<
      'rss.content-section',
      false
    >;
    heightImprovement: Schema.Attribute.Component<'rss.content-section', false>;
    heroSection: Schema.Attribute.Component<'rss.hero-section', false>;
    hypoglycemia: Schema.Attribute.Component<'rss.content-section', false>;
    insuranceCoverage: Schema.Attribute.Component<'rss.content-section', false>;
    phenotype: Schema.Attribute.Component<'rss.content-section', false>;
    puberty: Schema.Attribute.Component<'rss.content-section', false>;
    treatments: Schema.Attribute.Component<'rss.content-section', false>;
    weightManagement: Schema.Attribute.Component<'rss.content-section', false>;
    whatIsRss: Schema.Attribute.Component<'rss.content-section', false>;
  };
}

export interface RssPersonalStoriesTab extends Struct.ComponentSchema {
  collectionName: 'components_rss_personal_stories_tabs';
  info: {
    description: 'Content for the Personal Stories tab';
    displayName: 'RSS Personal Stories Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    stories: Schema.Attribute.Component<'rss.personal-story', true>;
    title: Schema.Attribute.String;
  };
}

export interface RssPersonalStory extends Struct.ComponentSchema {
  collectionName: 'components_rss_personal_stories';
  info: {
    description: 'A personal story from someone with RSS';
    displayName: 'RSS Personal Story';
  };
  attributes: {
    author: Schema.Attribute.String;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    date: Schema.Attribute.Date;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RssResourceCategory extends Struct.ComponentSchema {
  collectionName: 'components_rss_resource_categories';
  info: {
    description: 'A category of resources';
    displayName: 'RSS Resource Category';
  };
  attributes: {
    description: Schema.Attribute.Text;
    resources: Schema.Attribute.Component<'rss.resource-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RssResourceItem extends Struct.ComponentSchema {
  collectionName: 'components_rss_resource_items';
  info: {
    description: 'A single resource item';
    displayName: 'RSS Resource Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'files' | 'images' | 'videos'>;
    resourceType: Schema.Attribute.Enumeration<
      ['link', 'document', 'video', 'other']
    > &
      Schema.Attribute.DefaultTo<'link'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface RssResourcesTab extends Struct.ComponentSchema {
  collectionName: 'components_rss_resources_tabs';
  info: {
    description: 'Content for the Resources tab';
    displayName: 'RSS Resources Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    resourceCategories: Schema.Attribute.Component<
      'rss.resource-category',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SgaContentSection extends Struct.ComponentSchema {
  collectionName: 'components_sga_content_sections';
  info: {
    description: 'A content section with title and rich text content for SGA';
    displayName: 'SGA Content Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    subsections: Schema.Attribute.Component<'sga.content-subsection', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SgaContentSubsection extends Struct.ComponentSchema {
  collectionName: 'components_sga_content_subsections';
  info: {
    description: 'A subsection within an SGA content section';
    displayName: 'SGA Content Subsection';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<'sga.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SgaDivisionLeader extends Struct.ComponentSchema {
  collectionName: 'components_sga_division_leaders';
  info: {
    description: 'A division leader or consultant for SGA';
    displayName: 'SGA Division Leader';
  };
  attributes: {
    bio: Schema.Attribute.RichText;
    email: Schema.Attribute.Email;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    specializations: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SgaDivisionLeadersTab extends Struct.ComponentSchema {
  collectionName: 'components_sga_division_leaders_tabs';
  info: {
    description: 'Content for the SGA Division Leaders tab';
    displayName: 'SGA Division Leaders Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    leaders: Schema.Attribute.Component<'sga.division-leader', true>;
    title: Schema.Attribute.String;
  };
}

export interface SgaFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_sga_faq_items';
  info: {
    description: 'A single FAQ question and answer for SGA';
    displayName: 'SGA FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SgaFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sga_faq_sections';
  info: {
    description: 'FAQ section with questions and answers for SGA';
    displayName: 'SGA FAQ Section';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'sga.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SgaHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sga_hero_sections';
  info: {
    description: 'Hero section with title and image for SGA';
    displayName: 'SGA Hero Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SgaListItem extends Struct.ComponentSchema {
  collectionName: 'components_sga_list_items';
  info: {
    description: 'A single list item for SGA content';
    displayName: 'SGA List Item';
  };
  attributes: {
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SgaOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_sga_overview_tabs';
  info: {
    description: 'Content for the SGA Overview tab';
    displayName: 'SGA Overview Tab';
  };
  attributes: {
    adulthoodHealthIssues: Schema.Attribute.Component<
      'sga.content-section',
      false
    >;
    assessments: Schema.Attribute.Component<'sga.content-section', false>;
    boneAge: Schema.Attribute.Component<'sga.content-section', false>;
    factorsAffectingGht: Schema.Attribute.Component<
      'sga.content-section',
      false
    >;
    faqSection: Schema.Attribute.Component<'sga.faq-section', false>;
    firstSteps: Schema.Attribute.Component<'sga.content-section', false>;
    growthHormoneTherapy: Schema.Attribute.Component<
      'sga.content-section',
      false
    >;
    heightImprovement: Schema.Attribute.Component<'sga.content-section', false>;
    heroSection: Schema.Attribute.Component<'sga.hero-section', false>;
    howDetermined: Schema.Attribute.Component<'sga.content-section', false>;
    hypoglycemia: Schema.Attribute.Component<'sga.content-section', false>;
    insuranceCoverage: Schema.Attribute.Component<'sga.content-section', false>;
    physicalCharacteristics: Schema.Attribute.Component<
      'sga.content-section',
      false
    >;
    puberty: Schema.Attribute.Component<'sga.content-section', false>;
    treatments: Schema.Attribute.Component<'sga.content-section', false>;
    weightManagement: Schema.Attribute.Component<'sga.content-section', false>;
    whatDoesSgaMean: Schema.Attribute.Component<'sga.content-section', false>;
  };
}

export interface SgaPersonalStoriesTab extends Struct.ComponentSchema {
  collectionName: 'components_sga_personal_stories_tabs';
  info: {
    description: 'Content for the SGA Personal Stories tab';
    displayName: 'SGA Personal Stories Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    stories: Schema.Attribute.Component<'sga.personal-story', true>;
    title: Schema.Attribute.String;
  };
}

export interface SgaPersonalStory extends Struct.ComponentSchema {
  collectionName: 'components_sga_personal_stories';
  info: {
    description: 'A personal story from someone with SGA';
    displayName: 'SGA Personal Story';
  };
  attributes: {
    author: Schema.Attribute.String;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    date: Schema.Attribute.Date;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SgaResourceCategory extends Struct.ComponentSchema {
  collectionName: 'components_sga_resource_categories';
  info: {
    description: 'A category of resources for SGA';
    displayName: 'SGA Resource Category';
  };
  attributes: {
    description: Schema.Attribute.Text;
    resources: Schema.Attribute.Component<'sga.resource-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SgaResourceItem extends Struct.ComponentSchema {
  collectionName: 'components_sga_resource_items';
  info: {
    description: 'A single resource item for SGA';
    displayName: 'SGA Resource Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'files' | 'images' | 'videos'>;
    resourceType: Schema.Attribute.Enumeration<
      ['link', 'document', 'video', 'other']
    > &
      Schema.Attribute.DefaultTo<'link'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SgaResourcesTab extends Struct.ComponentSchema {
  collectionName: 'components_sga_resources_tabs';
  info: {
    description: 'Content for the SGA Resources tab';
    displayName: 'SGA Resources Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    resourceCategories: Schema.Attribute.Component<
      'sga.resource-category',
      true
    >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'emergency.emergency-accordion-item': EmergencyEmergencyAccordionItem;
      'emergency.genetic-disorder-response': EmergencyGeneticDisorderResponse;
      'rss.content-section': RssContentSection;
      'rss.content-subsection': RssContentSubsection;
      'rss.division-leader': RssDivisionLeader;
      'rss.division-leaders-tab': RssDivisionLeadersTab;
      'rss.faq-item': RssFaqItem;
      'rss.faq-section': RssFaqSection;
      'rss.hero-section': RssHeroSection;
      'rss.list-item': RssListItem;
      'rss.overview-tab': RssOverviewTab;
      'rss.personal-stories-tab': RssPersonalStoriesTab;
      'rss.personal-story': RssPersonalStory;
      'rss.resource-category': RssResourceCategory;
      'rss.resource-item': RssResourceItem;
      'rss.resources-tab': RssResourcesTab;
      'sga.content-section': SgaContentSection;
      'sga.content-subsection': SgaContentSubsection;
      'sga.division-leader': SgaDivisionLeader;
      'sga.division-leaders-tab': SgaDivisionLeadersTab;
      'sga.faq-item': SgaFaqItem;
      'sga.faq-section': SgaFaqSection;
      'sga.hero-section': SgaHeroSection;
      'sga.list-item': SgaListItem;
      'sga.overview-tab': SgaOverviewTab;
      'sga.personal-stories-tab': SgaPersonalStoriesTab;
      'sga.personal-story': SgaPersonalStory;
      'sga.resource-category': SgaResourceCategory;
      'sga.resource-item': SgaResourceItem;
      'sga.resources-tab': SgaResourcesTab;
    }
  }
}
