import type { Schema, Struct } from '@strapi/strapi';

export interface AboutContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_about_contact_infos';
  info: {
    description: 'Contact information item';
    displayName: 'About Contact Info';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutContactTab extends Struct.ComponentSchema {
  collectionName: 'components_about_contact_tabs';
  info: {
    description: 'Content for the About Contact Us tab';
    displayName: 'About Contact Tab';
  };
  attributes: {
    address: Schema.Attribute.Text;
    contactFormSubjects: Schema.Attribute.Component<'about.form-subject', true>;
    email: Schema.Attribute.Email;
    fax: Schema.Attribute.String;
    mapEmbedUrl: Schema.Attribute.String;
    phoneNumbers: Schema.Attribute.Component<'about.contact-info', true>;
  };
}

export interface AboutDivisionConsultant extends Struct.ComponentSchema {
  collectionName: 'components_about_division_consultants';
  info: {
    description: 'A division consultant';
    displayName: 'About Division Consultant';
  };
  attributes: {
    consultantName: Schema.Attribute.String & Schema.Attribute.Required;
    disorder: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutDivisionConsultantsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_about_division_consultants_sections';
  info: {
    description: 'Section for division consultants';
    displayName: 'About Division Consultants Section';
  };
  attributes: {
    consultants: Schema.Attribute.Component<'about.division-consultant', true>;
    description: Schema.Attribute.RichText;
  };
}

export interface AboutFormSubject extends Struct.ComponentSchema {
  collectionName: 'components_about_form_subjects';
  info: {
    description: 'A subject option for the contact form';
    displayName: 'About Form Subject';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutFounder extends Struct.ComponentSchema {
  collectionName: 'components_about_founders';
  info: {
    description: 'A founder with card image, name, and profile blocks (content/images) \u2014 same pattern as Personal Stories';
    displayName: 'About Founder';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    profileBlocks: Schema.Attribute.Component<
      'about.founder-profile-block',
      true
    >;
  };
}

export interface AboutFounderProfileBlock extends Struct.ComponentSchema {
  collectionName: 'components_about_founder_profile_blocks';
  info: {
    description: 'A single block in a founder profile: either content (richtext) or image';
    displayName: 'About Founder Profile Block';
  };
  attributes: {
    blockType: Schema.Attribute.Enumeration<['content', 'image']> &
      Schema.Attribute.Required;
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface AboutGoalItem extends Struct.ComponentSchema {
  collectionName: 'components_about_goal_items';
  info: {
    description: 'A single goal item';
    displayName: 'About Goal Item';
  };
  attributes: {
    text: Schema.Attribute.RichText;
  };
}

export interface AboutGoalsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_goals_sections';
  info: {
    description: 'A goals section with title and list items';
    displayName: 'About Goals Section';
  };
  attributes: {
    goals: Schema.Attribute.Component<'about.goal-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutHistorySection extends Struct.ComponentSchema {
  collectionName: 'components_about_history_sections';
  info: {
    description: 'A history section with title and content';
    displayName: 'About History Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutHistoryTab extends Struct.ComponentSchema {
  collectionName: 'components_about_history_tabs';
  info: {
    description: 'Content for the About History tab';
    displayName: 'About History Tab';
  };
  attributes: {
    founders: Schema.Attribute.Component<'about.founder', true>;
    historySections: Schema.Attribute.Component<'about.history-section', true>;
  };
}

export interface AboutInstructionStep extends Struct.ComponentSchema {
  collectionName: 'components_about_instruction_steps';
  info: {
    description: 'A single instruction step';
    displayName: 'About Instruction Step';
  };
  attributes: {
    stepNumber: Schema.Attribute.Integer;
    text: Schema.Attribute.RichText;
  };
}

export interface AboutInstructionsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_instructions_sections';
  info: {
    description: 'A section with instructions/steps';
    displayName: 'About Instructions Section';
  };
  attributes: {
    footerText: Schema.Attribute.Text;
    instructions: Schema.Attribute.Component<'about.instruction-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutMedicalAdvisor extends Struct.ComponentSchema {
  collectionName: 'components_about_medical_advisors';
  info: {
    description: 'A medical advisory board member';
    displayName: 'About Medical Advisor';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    qualifications: Schema.Attribute.RichText;
  };
}

export interface AboutOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_about_overview_tabs';
  info: {
    description: 'Content for the About Overview tab';
    displayName: 'About Overview Tab';
  };
  attributes: {
    disclaimer: Schema.Attribute.Component<'about.text-block', false>;
    goalsForAdults: Schema.Attribute.Component<'about.goals-section', false>;
    goalsForChildren: Schema.Attribute.Component<'about.goals-section', false>;
    heightMeasurementInstructions: Schema.Attribute.Component<
      'about.instructions-section',
      false
    >;
    introParagraphs: Schema.Attribute.Component<'about.text-block', true>;
    testimonial: Schema.Attribute.Component<'about.testimonial', false>;
  };
}

export interface AboutTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_team_members';
  info: {
    description: 'A team member (board or staff)';
    displayName: 'About Team Member';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutTeamStructureTab extends Struct.ComponentSchema {
  collectionName: 'components_about_team_structure_tabs';
  info: {
    description: 'Content for the About Team Structure tab';
    displayName: 'About Team Structure Tab';
  };
  attributes: {
    boardMembers: Schema.Attribute.Component<'about.team-member', true>;
    divisionConsultants: Schema.Attribute.Component<
      'about.division-consultants-section',
      false
    >;
    medicalAdvisoryBoard: Schema.Attribute.Component<
      'about.medical-advisor',
      true
    >;
    staffMembers: Schema.Attribute.Component<'about.team-member', true>;
  };
}

export interface AboutTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_about_testimonials';
  info: {
    description: 'A testimonial quote';
    displayName: 'About Testimonial';
  };
  attributes: {
    author: Schema.Attribute.String;
    location: Schema.Attribute.String;
    quote: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface AboutTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_about_text_blocks';
  info: {
    description: 'A simple text block with rich text content';
    displayName: 'About Text Block';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    disclaimerTitle: Schema.Attribute.String;
  };
}

export interface DisorderContentSection extends Struct.ComponentSchema {
  collectionName: 'components_disorder_content_sections';
  info: {
    description: 'A content section with title and rich text content';
    displayName: 'Disorder Content Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<'disorder.list-item', true>;
    subsections: Schema.Attribute.Component<
      'disorder.content-subsection',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DisorderContentSubsection extends Struct.ComponentSchema {
  collectionName: 'components_disorder_content_subsections';
  info: {
    description: 'A subsection within a content section';
    displayName: 'Disorder Content Subsection';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<'disorder.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface DisorderDivisionLeader extends Struct.ComponentSchema {
  collectionName: 'components_disorder_division_leaders';
  info: {
    description: 'A division leader or consultant';
    displayName: 'Disorder Division Leader';
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

export interface DisorderDivisionLeadersTab extends Struct.ComponentSchema {
  collectionName: 'components_disorder_division_leaders_tabs';
  info: {
    description: 'Content for the Division Leaders tab';
    displayName: 'Disorder Division Leaders Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    leaders: Schema.Attribute.Component<'disorder.division-leader', true>;
    title: Schema.Attribute.String;
  };
}

export interface DisorderFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_disorder_faq_items';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'Disorder FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DisorderFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_disorder_faq_sections';
  info: {
    description: 'FAQ section with questions and answers';
    displayName: 'Disorder FAQ Section';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'disorder.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface DisorderHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_disorder_hero_sections';
  info: {
    description: 'Hero section with title and image';
    displayName: 'Disorder Hero Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DisorderListItem extends Struct.ComponentSchema {
  collectionName: 'components_disorder_list_items';
  info: {
    description: 'A single list item';
    displayName: 'Disorder List Item';
  };
  attributes: {
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface DisorderOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_disorder_overview_tabs';
  info: {
    description: 'Content for the disorder Overview tab';
    displayName: 'Disorder Overview Tab';
  };
  attributes: {
    contentSections: Schema.Attribute.Component<
      'disorder.content-section',
      true
    >;
    faqSection: Schema.Attribute.Component<'disorder.faq-section', false>;
    heroSection: Schema.Attribute.Component<'disorder.hero-section', false>;
  };
}

export interface DisorderPersonalStoriesTab extends Struct.ComponentSchema {
  collectionName: 'components_disorder_personal_stories_tabs';
  info: {
    description: 'Content for the Personal Stories tab';
    displayName: 'Disorder Personal Stories Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    stories: Schema.Attribute.Component<'disorder.personal-story', true>;
    title: Schema.Attribute.String;
  };
}

export interface DisorderPersonalStory extends Struct.ComponentSchema {
  collectionName: 'components_disorder_personal_stories';
  info: {
    description: 'A personal story';
    displayName: 'Disorder Personal Story';
  };
  attributes: {
    author: Schema.Attribute.String;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    date: Schema.Attribute.Date;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DisorderResourceCategory extends Struct.ComponentSchema {
  collectionName: 'components_disorder_resource_categories';
  info: {
    description: 'A category of resources';
    displayName: 'Disorder Resource Category';
  };
  attributes: {
    description: Schema.Attribute.Text;
    resources: Schema.Attribute.Component<'disorder.resource-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DisorderResourceItem extends Struct.ComponentSchema {
  collectionName: 'components_disorder_resource_items';
  info: {
    description: 'A single resource item';
    displayName: 'Disorder Resource Item';
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

export interface DisorderResourcesTab extends Struct.ComponentSchema {
  collectionName: 'components_disorder_resources_tabs';
  info: {
    description: 'Content for the Resources tab';
    displayName: 'Disorder Resources Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    resourceCategories: Schema.Attribute.Component<
      'disorder.resource-category',
      true
    >;
    title: Schema.Attribute.String;
  };
}

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

export interface GrowthChartChartCategory extends Struct.ComponentSchema {
  collectionName: 'components_growth_chart_chart_categories';
  info: {
    description: 'A category of growth charts';
    displayName: 'Growth Chart Category';
  };
  attributes: {
    charts: Schema.Attribute.Component<'growth-chart.chart-item', true>;
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface GrowthChartChartItem extends Struct.ComponentSchema {
  collectionName: 'components_growth_chart_chart_items';
  info: {
    description: 'A single growth chart item';
    displayName: 'Growth Chart Item';
  };
  attributes: {
    ageRange: Schema.Attribute.String;
    chartType: Schema.Attribute.Enumeration<['link', 'file', 'excel']> &
      Schema.Attribute.DefaultTo<'link'>;
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'files' | 'images'>;
    gender: Schema.Attribute.Enumeration<['boys', 'girls', 'both']> &
      Schema.Attribute.DefaultTo<'both'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface GrowthChartInstructionStep extends Struct.ComponentSchema {
  collectionName: 'components_growth_chart_instruction_steps';
  info: {
    description: 'A single step in instructions';
    displayName: 'Instruction Step';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    stepNumber: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface GrowthChartInstructionsSection extends Struct.ComponentSchema {
  collectionName: 'components_growth_chart_instructions_sections';
  info: {
    description: 'Instructions section for using growth charts';
    displayName: 'Growth Chart Instructions Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    steps: Schema.Attribute.Component<'growth-chart.instruction-step', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GrowthChartIntroSection extends Struct.ComponentSchema {
  collectionName: 'components_growth_chart_intro_sections';
  info: {
    description: 'Introduction section for growth charts page';
    displayName: 'Growth Chart Intro Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    instructionLink: Schema.Attribute.String;
    instructionLinkText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'at home instructions'>;
    title: Schema.Attribute.String;
  };
}

export interface InsuranceAppealsAccordionSection
  extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_accordion_sections';
  info: {
    description: 'Expandable section for Overview tab';
    displayName: 'Insurance Accordion Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface InsuranceAppealsAppealListItem extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_appeal_list_items';
  info: {
    description: 'Bullet item for Appeal Process tab';
    displayName: 'Appeal Process List Item';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface InsuranceAppealsAppealProcessTab
  extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_appeal_process_tabs';
  info: {
    description: 'Appeal Process tab content';
    displayName: 'Insurance Appeal Process Tab';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    footnote: Schema.Attribute.Text;
    intro: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<
      'insurance-appeals.appeal-list-item',
      true
    >;
  };
}

export interface InsuranceAppealsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_faq_items';
  info: {
    description: 'Single FAQ question and answer';
    displayName: 'Insurance FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface InsuranceAppealsFaqTab extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_faq_tabs';
  info: {
    description: 'FAQ tab with Q&A list';
    displayName: 'Insurance FAQ Tab';
  };
  attributes: {
    faqItems: Schema.Attribute.Component<'insurance-appeals.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface InsuranceAppealsFollowUpProcedureTab
  extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_follow_up_procedure_tabs';
  info: {
    description: 'Follow up Procedure tab - intro and HIPAA form link';
    displayName: 'Insurance Follow Up Procedure Tab';
  };
  attributes: {
    hipaaFormFile: Schema.Attribute.Media<'files'>;
    hipaaFormUrl: Schema.Attribute.String;
    instructions: Schema.Attribute.RichText;
    intro: Schema.Attribute.RichText;
  };
}

export interface InsuranceAppealsOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_overview_tabs';
  info: {
    description: 'Overview tab with video and accordion sections';
    displayName: 'Insurance Overview Tab';
  };
  attributes: {
    accordionSections: Schema.Attribute.Component<
      'insurance-appeals.accordion-section',
      true
    >;
    intro: Schema.Attribute.RichText;
    videoEmbedUrl: Schema.Attribute.String;
  };
}

export interface InsuranceAppealsPatientAssistanceTab
  extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_patient_assistance_tabs';
  info: {
    description: 'Patient Assistance tab with intro and testimonials';
    displayName: 'Insurance Patient Assistance Tab';
  };
  attributes: {
    intro: Schema.Attribute.RichText;
    testimonials: Schema.Attribute.Component<
      'insurance-appeals.testimonial-item',
      true
    >;
  };
}

export interface InsuranceAppealsTestimonialItem
  extends Struct.ComponentSchema {
  collectionName: 'components_insurance_appeals_testimonial_items';
  info: {
    description: 'Patient assistance testimonial';
    displayName: 'Insurance Testimonial';
  };
  attributes: {
    author: Schema.Attribute.String;
    location: Schema.Attribute.String;
    quote: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface ResourcesGetSupportTab extends Struct.ComponentSchema {
  collectionName: 'components_resources_get_support_tabs';
  info: {
    description: 'Content for the Get Support tab';
    displayName: 'Get Support Tab';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface ResourcesInformationalVideosTab
  extends Struct.ComponentSchema {
  collectionName: 'components_resources_informational_videos_tabs';
  info: {
    description: 'Intro text and video grid';
    displayName: 'Informational Videos Tab';
  };
  attributes: {
    intro: Schema.Attribute.RichText;
    videos: Schema.Attribute.Component<'resources.video-item', true>;
    youtubeChannelUrl: Schema.Attribute.String;
  };
}

export interface ResourcesOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_resources_overview_tabs';
  info: {
    description: 'Overview tab content (brochures, links, etc.)';
    displayName: 'Resources Overview Tab';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface ResourcesSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_resources_social_links';
  info: {
    description: 'Label and URL for a social/group link';
    displayName: 'Social Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ResourcesSocialMediaTab extends Struct.ComponentSchema {
  collectionName: 'components_resources_social_media_tabs';
  info: {
    description: 'Parents and adults division-specific groups';
    displayName: 'Social Media Tab';
  };
  attributes: {
    adultsGroups: Schema.Attribute.Component<'resources.social-link', true>;
    adultsSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Affected Adults - connect to our closed division specific FB groups through the links below:'>;
    parentsGroups: Schema.Attribute.Component<'resources.social-link', true>;
    parentsSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PARENTS of affected children, connect to our closed division specific FB groups through the links below:'>;
  };
}

export interface ResourcesSpreadTheWordTab extends Struct.ComponentSchema {
  collectionName: 'components_resources_spread_the_word_tabs';
  info: {
    description: 'Content for the Spread the Word tab';
    displayName: 'Spread the Word Tab';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface ResourcesVideoItem extends Struct.ComponentSchema {
  collectionName: 'components_resources_video_items';
  info: {
    description: 'Single video entry with thumbnail and link';
    displayName: 'Video Item';
  };
  attributes: {
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String;
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

export interface TempleContentSection extends Struct.ComponentSchema {
  collectionName: 'components_temple_content_sections';
  info: {
    description: 'A content section with title and rich text content';
    displayName: 'Temple Content Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<'temple.list-item', true>;
    subsections: Schema.Attribute.Component<'temple.content-subsection', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TempleContentSubsection extends Struct.ComponentSchema {
  collectionName: 'components_temple_content_subsections';
  info: {
    description: 'A subsection within a content section';
    displayName: 'Temple Content Subsection';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    listItems: Schema.Attribute.Component<'temple.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface TempleDivisionLeader extends Struct.ComponentSchema {
  collectionName: 'components_temple_division_leaders';
  info: {
    description: 'A division leader or consultant';
    displayName: 'Temple Division Leader';
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

export interface TempleDivisionLeadersTab extends Struct.ComponentSchema {
  collectionName: 'components_temple_division_leaders_tabs';
  info: {
    description: 'Content for the Division Leaders tab';
    displayName: 'Temple Division Leaders Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    leaders: Schema.Attribute.Component<'temple.division-leader', true>;
    title: Schema.Attribute.String;
  };
}

export interface TempleFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_temple_faq_items';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'Temple FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String;
  };
}

export interface TempleFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_temple_faq_sections';
  info: {
    description: 'FAQ section with questions and answers';
    displayName: 'Temple FAQ Section';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'temple.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface TempleHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_temple_hero_sections';
  info: {
    description: 'Hero section with title and image';
    displayName: 'Temple Hero Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TempleListItem extends Struct.ComponentSchema {
  collectionName: 'components_temple_list_items';
  info: {
    description: 'A single list item';
    displayName: 'Temple List Item';
  };
  attributes: {
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TempleOverviewTab extends Struct.ComponentSchema {
  collectionName: 'components_temple_overview_tabs';
  info: {
    description: 'Content for the Temple Syndrome Overview tab';
    displayName: 'Temple Overview Tab';
  };
  attributes: {
    adulthoodHealthIssues: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    boneAge: Schema.Attribute.Component<'temple.content-section', false>;
    cognitiveAbilities: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    diagnosis: Schema.Attribute.Component<'temple.content-section', false>;
    factorsAffectingGht: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    faqSection: Schema.Attribute.Component<'temple.faq-section', false>;
    firstSteps: Schema.Attribute.Component<'temple.content-section', false>;
    growthHormoneTherapy: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    heightImprovement: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    heroSection: Schema.Attribute.Component<'temple.hero-section', false>;
    hypoglycemia: Schema.Attribute.Component<'temple.content-section', false>;
    insuranceCoverage: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    phenotype: Schema.Attribute.Component<'temple.content-section', false>;
    puberty: Schema.Attribute.Component<'temple.content-section', false>;
    treatments: Schema.Attribute.Component<'temple.content-section', false>;
    weightManagement: Schema.Attribute.Component<
      'temple.content-section',
      false
    >;
    whatIsTemple: Schema.Attribute.Component<'temple.content-section', false>;
  };
}

export interface TemplePersonalStoriesTab extends Struct.ComponentSchema {
  collectionName: 'components_temple_personal_stories_tabs';
  info: {
    description: 'Content for the Personal Stories tab';
    displayName: 'Temple Personal Stories Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    stories: Schema.Attribute.Component<'temple.personal-story', true>;
    title: Schema.Attribute.String;
  };
}

export interface TemplePersonalStory extends Struct.ComponentSchema {
  collectionName: 'components_temple_personal_stories';
  info: {
    description: 'A personal story from someone with Temple Syndrome';
    displayName: 'Temple Personal Story';
  };
  attributes: {
    author: Schema.Attribute.String;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    date: Schema.Attribute.Date;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TempleResourceCategory extends Struct.ComponentSchema {
  collectionName: 'components_temple_resource_categories';
  info: {
    description: 'A category of resources';
    displayName: 'Temple Resource Category';
  };
  attributes: {
    description: Schema.Attribute.Text;
    resources: Schema.Attribute.Component<'temple.resource-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TempleResourceItem extends Struct.ComponentSchema {
  collectionName: 'components_temple_resource_items';
  info: {
    description: 'A single resource item';
    displayName: 'Temple Resource Item';
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

export interface TempleResourcesTab extends Struct.ComponentSchema {
  collectionName: 'components_temple_resources_tabs';
  info: {
    description: 'Content for the Resources tab';
    displayName: 'Temple Resources Tab';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    resourceCategories: Schema.Attribute.Component<
      'temple.resource-category',
      true
    >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.contact-info': AboutContactInfo;
      'about.contact-tab': AboutContactTab;
      'about.division-consultant': AboutDivisionConsultant;
      'about.division-consultants-section': AboutDivisionConsultantsSection;
      'about.form-subject': AboutFormSubject;
      'about.founder': AboutFounder;
      'about.founder-profile-block': AboutFounderProfileBlock;
      'about.goal-item': AboutGoalItem;
      'about.goals-section': AboutGoalsSection;
      'about.history-section': AboutHistorySection;
      'about.history-tab': AboutHistoryTab;
      'about.instruction-step': AboutInstructionStep;
      'about.instructions-section': AboutInstructionsSection;
      'about.medical-advisor': AboutMedicalAdvisor;
      'about.overview-tab': AboutOverviewTab;
      'about.team-member': AboutTeamMember;
      'about.team-structure-tab': AboutTeamStructureTab;
      'about.testimonial': AboutTestimonial;
      'about.text-block': AboutTextBlock;
      'disorder.content-section': DisorderContentSection;
      'disorder.content-subsection': DisorderContentSubsection;
      'disorder.division-leader': DisorderDivisionLeader;
      'disorder.division-leaders-tab': DisorderDivisionLeadersTab;
      'disorder.faq-item': DisorderFaqItem;
      'disorder.faq-section': DisorderFaqSection;
      'disorder.hero-section': DisorderHeroSection;
      'disorder.list-item': DisorderListItem;
      'disorder.overview-tab': DisorderOverviewTab;
      'disorder.personal-stories-tab': DisorderPersonalStoriesTab;
      'disorder.personal-story': DisorderPersonalStory;
      'disorder.resource-category': DisorderResourceCategory;
      'disorder.resource-item': DisorderResourceItem;
      'disorder.resources-tab': DisorderResourcesTab;
      'emergency.emergency-accordion-item': EmergencyEmergencyAccordionItem;
      'emergency.genetic-disorder-response': EmergencyGeneticDisorderResponse;
      'growth-chart.chart-category': GrowthChartChartCategory;
      'growth-chart.chart-item': GrowthChartChartItem;
      'growth-chart.instruction-step': GrowthChartInstructionStep;
      'growth-chart.instructions-section': GrowthChartInstructionsSection;
      'growth-chart.intro-section': GrowthChartIntroSection;
      'insurance-appeals.accordion-section': InsuranceAppealsAccordionSection;
      'insurance-appeals.appeal-list-item': InsuranceAppealsAppealListItem;
      'insurance-appeals.appeal-process-tab': InsuranceAppealsAppealProcessTab;
      'insurance-appeals.faq-item': InsuranceAppealsFaqItem;
      'insurance-appeals.faq-tab': InsuranceAppealsFaqTab;
      'insurance-appeals.follow-up-procedure-tab': InsuranceAppealsFollowUpProcedureTab;
      'insurance-appeals.overview-tab': InsuranceAppealsOverviewTab;
      'insurance-appeals.patient-assistance-tab': InsuranceAppealsPatientAssistanceTab;
      'insurance-appeals.testimonial-item': InsuranceAppealsTestimonialItem;
      'resources.get-support-tab': ResourcesGetSupportTab;
      'resources.informational-videos-tab': ResourcesInformationalVideosTab;
      'resources.overview-tab': ResourcesOverviewTab;
      'resources.social-link': ResourcesSocialLink;
      'resources.social-media-tab': ResourcesSocialMediaTab;
      'resources.spread-the-word-tab': ResourcesSpreadTheWordTab;
      'resources.video-item': ResourcesVideoItem;
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
      'temple.content-section': TempleContentSection;
      'temple.content-subsection': TempleContentSubsection;
      'temple.division-leader': TempleDivisionLeader;
      'temple.division-leaders-tab': TempleDivisionLeadersTab;
      'temple.faq-item': TempleFaqItem;
      'temple.faq-section': TempleFaqSection;
      'temple.hero-section': TempleHeroSection;
      'temple.list-item': TempleListItem;
      'temple.overview-tab': TempleOverviewTab;
      'temple.personal-stories-tab': TemplePersonalStoriesTab;
      'temple.personal-story': TemplePersonalStory;
      'temple.resource-category': TempleResourceCategory;
      'temple.resource-item': TempleResourceItem;
      'temple.resources-tab': TempleResourcesTab;
    }
  }
}
