/**
 * Temple Syndrome seed data for Strapi bootstrap.
 * All richtext fields (description, content, answer) must be plain strings for Strapi 5 validation.
 */

const templeSyndromeData = {
  title: "Temple Syndrome",
  slug: "temple-syndrome",

  overviewTab: {
    heroSection: {
      title: "Temple Syndrome (TS14)",
      subtitle:
        "A rare imprinting disorder involving chromosome 14 that affects growth, development, and puberty.",
      description:
        "Temple syndrome (TS14) is a rare genetic imprinting disorder caused by abnormalities involving chromosome 14. Individuals with Temple syndrome commonly present with growth restriction before and after birth, early-onset puberty, short stature, and feeding difficulties. Early diagnosis and coordinated medical care can significantly improve health outcomes and quality of life.",
    },

    whatIsTemple: {
      title: "What is Temple Syndrome?",
      content:
        "Temple syndrome (TS14) is a rare genetic condition caused by abnormal imprinting of genes on chromosome 14. It results from one of three genetic mechanisms:\n\nThese genetic changes disrupt normal growth and hormonal signaling, leading to characteristic physical and developmental features. Temple syndrome is sometimes considered the \"counterpart\" to Kagami–Ogata syndrome, which involves paternal UPD of chromosome 14.",
      listItems: [
        { text: "Maternal uniparental disomy of chromosome 14 (UPD(14)mat)" },
        { text: "Paternal deletion of the imprinted region on chromosome 14" },
        {
          text: "An imprinting (methylation) defect affecting gene regulation",
        },
      ],
    },

    diagnosis: {
      title: "Diagnosis",
      content:
        "Diagnosis of Temple syndrome typically involves specialized genetic testing. Standard karyotyping is often normal, so targeted molecular testing is required.\n\nDiagnosis may be suspected based on clinical features such as early puberty, growth restriction, and hypotonia, especially when combined with a history of being small for gestational age. Early genetic confirmation is important for guiding treatment decisions and long-term monitoring.",
      listItems: [
        { text: "Methylation analysis of chromosome 14" },
        { text: "SNP microarray testing" },
        { text: "Uniparental disomy studies" },
        { text: "Targeted testing for known imprinted regions" },
      ],
    },

    phenotype: {
      title: "Physical Characteristics",
      content:
        "Individuals with Temple syndrome may display a range of physical features, which can vary in severity.\n\nNot all individuals will show every feature, and some characteristics become more apparent with age.",
      listItems: [
        { text: "Intrauterine growth restriction (IUGR)" },
        { text: "Small for gestational age (SGA) birth" },
        { text: "Short stature" },
        { text: "Hypotonia (low muscle tone)" },
        { text: "Feeding difficulties in infancy" },
        { text: "Small hands and feet" },
        { text: "Mild facial features (often subtle and variable)" },
      ],
    },

    cognitiveAbilities: {
      title: "Cognitive Development",
      content:
        "Cognitive outcomes in Temple syndrome are variable.\n\nEarly developmental assessment and intervention can help optimize educational and cognitive outcomes.",
      listItems: [
        { text: "Many individuals have normal intelligence" },
        { text: "Some experience mild learning difficulties" },
        { text: "Speech and language delays may occur" },
        {
          text: "Executive functioning and attention challenges are occasionally reported",
        },
      ],
    },

    firstSteps: {
      title: "First Steps After Diagnosis",
      content:
        "After a diagnosis of Temple syndrome, families are typically advised to:\n\nA coordinated, multidisciplinary approach helps address the wide range of potential symptoms.",
      listItems: [
        { text: "Establish care with a pediatric endocrinologist" },
        { text: "Monitor growth and pubertal development closely" },
        { text: "Evaluate feeding and nutritional status" },
        {
          text: "Begin developmental and speech evaluations if needed",
        },
        { text: "Consider referral to a genetic counselor" },
      ],
    },

    hypoglycemia: {
      title: "Hypoglycemia",
      content:
        "Hypoglycemia is not a universal feature of Temple syndrome but has been reported in some individuals, particularly in infancy.\n\nMonitoring blood glucose in infants with poor feeding or failure to thrive is recommended.",
      listItems: [
        { text: "Feeding difficulties" },
        { text: "Low muscle mass" },
        { text: "Altered metabolic regulation" },
      ],
    },

    treatments: {
      title: "Treatment and Management",
      content:
        "There is no cure for Temple syndrome, but many symptoms can be effectively managed.\n\nTreatment plans are individualized based on symptoms and age.",
      listItems: [
        { text: "Growth hormone therapy" },
        { text: "Nutritional support" },
        { text: "Management of early puberty" },
        { text: "Physical and occupational therapy for hypotonia" },
        { text: "Speech and language therapy" },
      ],
    },

    weightManagement: {
      title: "Weight and Nutrition",
      content:
        "Feeding difficulties are common in infancy, while later childhood may involve a tendency toward increased body fat.\n\nUnlike some other imprinting disorders, obesity is not universal but should be monitored.",
      listItems: [
        { text: "Early feeding support for infants" },
        { text: "Monitoring for excessive weight gain in later childhood" },
        { text: "Encouraging healthy eating habits and physical activity" },
      ],
    },

    boneAge: {
      title: "Bone Age",
      content:
        "Advanced bone age is frequently observed in individuals with Temple syndrome, especially in association with early-onset puberty.\n\nRegular bone age assessments are important for treatment planning.",
      listItems: [
        { text: "Early growth spurts" },
        { text: "Premature closure of growth plates" },
        { text: "Reduced adult height" },
      ],
    },

    puberty: {
      title: "Puberty and Hormonal Development",
      content:
        "Precocious or early-onset puberty is a hallmark feature of Temple syndrome.\n\nMedical management may involve puberty-suppressing treatments to protect adult height and reduce psychosocial impact.",
      listItems: [
        { text: "Early breast development or testicular enlargement" },
        { text: "Rapid progression of pubertal changes" },
        { text: "Early menarche in females" },
      ],
    },

    heightImprovement: {
      title: "Height Outcomes",
      content:
        "Without intervention, many individuals with Temple syndrome have reduced adult height due to early puberty and advanced bone age.\n\nRegular growth monitoring is essential.",
      listItems: [
        { text: "Early diagnosis" },
        { text: "Growth hormone therapy" },
        { text: "Timely management of puberty" },
      ],
    },

    growthHormoneTherapy: {
      title: "Growth Hormone Therapy",
      content:
        "Growth hormone (GH) therapy is commonly considered for individuals with Temple syndrome who have short stature or growth failure.\n\nResponse to GH therapy varies, and treatment should be managed by an experienced endocrinologist.",
      listItems: [
        { text: "Improved linear growth" },
        { text: "Increased muscle mass" },
        { text: "Improved body composition" },
      ],
    },

    insuranceCoverage: {
      title: "Insurance Considerations",
      content:
        "Insurance coverage for growth hormone therapy and puberty suppression varies by country and provider.\n\nFamilies often benefit from advocacy and detailed medical documentation.",
      listItems: [
        { text: "Documented growth hormone deficiency or short stature" },
        { text: "Genetic confirmation of diagnosis" },
        { text: "Demonstrated growth failure" },
      ],
    },

    factorsAffectingGht: {
      title: "Factors Affecting Treatment Response",
      content:
        "Several factors influence the effectiveness of growth hormone therapy:\n\nEarlier treatment generally leads to better outcomes.",
      listItems: [
        { text: "Age at treatment initiation" },
        { text: "Degree of bone age advancement" },
        { text: "Pubertal status" },
        { text: "Treatment adherence" },
      ],
    },

    adulthoodHealthIssues: {
      title: "Adulthood and Long-Term Health",
      content:
        "Data on adults with Temple syndrome is limited, but available evidence suggests:\n\nLong-term outcomes continue to be studied as awareness of the condition increases.",
      listItems: [
        { text: "Most adults live independently" },
        { text: "Ongoing endocrine follow-up may be needed" },
        { text: "Monitoring for metabolic health is recommended" },
      ],
    },

    faqSection: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Is Temple syndrome inherited?",
          answer:
            "Most cases occur sporadically and are not inherited, though rare familial cases have been reported.",
        },
        {
          question: "Is Temple syndrome life-threatening?",
          answer:
            "No, Temple syndrome is not typically life-threatening, but it does require medical management.",
        },
        {
          question: "Can adults with Temple syndrome have children?",
          answer:
            "Fertility is generally normal, though individual outcomes vary.",
        },
        {
          question: "Is Temple syndrome the same as Prader-Willi syndrome?",
          answer:
            "No. While both involve imprinting and growth issues, they are distinct genetic conditions with different features.",
        },
      ],
    },
  },
};

// Data shape for Strapi entityService.create (overviewTab as-is; all richtext fields are strings)
const templeSyndromeDataForStrapi = {
  title: templeSyndromeData.title,
  slug: templeSyndromeData.slug,
  overviewTab: templeSyndromeData.overviewTab,
};

export default templeSyndromeDataForStrapi;
export { templeSyndromeData };
