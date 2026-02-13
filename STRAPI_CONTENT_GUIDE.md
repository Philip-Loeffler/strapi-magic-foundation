# Strapi Content Guide for Russell Silver Syndrome Page

This guide explains how to populate the Russell Silver Syndrome content in Strapi CMS.

## Collection Type: Russell Silver Syndrome

The main collection type is `russell-silver-syndrome` which contains four main tabs:

1. **Overview Tab** - Main informational content
2. **Personal Stories Tab** - Personal stories from individuals with RSS
3. **Resources Tab** - Educational resources and links
4. **Division Leaders Tab** - Information about division leaders and consultants

## Content Structure

### Overview Tab Components

The Overview tab uses the following components:

#### Hero Section (`rss.hero-section`)
- **title** (string): Main hero title
- **subtitle** (text): Subtitle text
- **image** (media): Hero image
- **description** (richtext): Hero description content

#### Content Sections (`rss.content-section`)
Multiple content sections can be added:
- **whatIsRss**: What is Russell Silver Syndrome
- **diagnosis**: How is RSS diagnosed
- **phenotype**: Typical RSS phenotype
- **cognitiveAbilities**: Cognitive abilities information
- **firstSteps**: What to do first if you think your child has RSS
- **hypoglycemia**: Hypoglycemia and ketonuria information
- **treatments**: Different treatments needed
- **weightManagement**: Weight management and BMI information
- **boneAge**: Bone age information
- **puberty**: Early puberty information
- **heightImprovement**: Can height be improved
- **growthHormoneTherapy**: Growth hormone therapy benefits and risks
- **insuranceCoverage**: Insurance coverage tips
- **factorsAffectingGht**: Factors affecting growth hormone therapy
- **adulthoodHealthIssues**: Health issues in adulthood

Each content section has:
- **title** (string): Section title
- **content** (richtext): Main content
- **subsections** (repeatable component): Optional subsections

#### FAQ Section (`rss.faq-section`)
- **title** (string): FAQ section title
- **faqs** (repeatable component): List of FAQ items

Each FAQ item has:
- **question** (string): The question
- **answer** (richtext): The answer

### Personal Stories Tab

#### Personal Stories Tab (`rss.personal-stories-tab`)
- **title** (string): Tab title
- **description** (richtext): Introduction text
- **stories** (repeatable component): List of personal stories

Each story (`rss.personal-story`) has:
- **title** (string): Story title
- **author** (string): Author name
- **content** (richtext): Story content
- **image** (media): Story image (optional)
- **date** (date): Publication date

### Resources Tab

#### Resources Tab (`rss.resources-tab`)
- **title** (string): Tab title
- **description** (richtext): Introduction text
- **resourceCategories** (repeatable component): Categories of resources

Each resource category (`rss.resource-category`) has:
- **title** (string): Category title
- **description** (text): Category description
- **resources** (repeatable component): List of resources

Each resource (`rss.resource-item`) has:
- **title** (string): Resource title
- **description** (text): Resource description
- **url** (string): External URL (if applicable)
- **file** (media): File attachment (if applicable)
- **resourceType** (enum): Type (link, document, video, other)

### Division Leaders Tab

#### Division Leaders Tab (`rss.division-leaders-tab`)
- **title** (string): Tab title
- **description** (richtext): Introduction text
- **leaders** (repeatable component): List of division leaders

Each leader (`rss.division-leader`) has:
- **name** (string): Leader name
- **title** (string): Job title
- **bio** (richtext): Biography
- **email** (email): Contact email
- **phone** (string): Contact phone
- **image** (media): Profile image (optional)
- **specializations** (text): Areas of specialization

## Sample Content from MAGIC Foundation Website

### What is Russell Silver Syndrome

**Title**: What is Russell Silver Syndrome

**Content**: 
Russell-Silver syndrome (or Silver-Russell syndrome) is a rare genetic disorder characterized by delayed growth in-utero (IUGR) that spares head growth (meaning the newborn has a head size that is large for his body) and ongoing postnatal growth failure. This disorder includes feeding difficulties and/or low BMI, dysmorphic features including a protruding forehead, and frequently body asymmetry (hemihypotrophy). The true incidence is unknown but is estimated at 1 per every 35,000 – 100,000 live births.

It was way back in 1953 and 1954 that Dr. Silver and Dr. Russell independently described groups of small-for-gestational-age [SGA] children whose pregnancies had been complicated by intrauterine growth restriction [IUGR]. Their common findings were short stature without catch-up growth, normal head size for age, a distinctive triangular face, low-set ears and incurving fifth fingers. These two groups of patients are now considered to have had variations of the same disorder that we now call Russell-Silver syndrome [RSS] in North America, and Silver-Russell syndrome [SRS] in Europe.

### How is Russell-Silver Syndrome Diagnosed?

**Title**: How is Russell-Silver Syndrome Diagnosed?

**Content**:
Molecular Testing: Russell-Silver syndrome can be diagnosed with genetic testing; but negative genetic testing does not rule out a clinical diagnosis. Currently, genetic testing can be run for known causes of Russell-Silver Syndrome involving chromosomes 7 and 11.

[Include detailed diagnosis information from the website]

### Typical Russell-Silver Syndrome Phenotype

**Title**: What is the Typical Russell-Silver Syndrome Phenotype (Physical Characteristics)?

**Content**:
[Include phenotype characteristics from the website]

**Subsections** with list items:
- Characteristics That Occur More Frequently in Russell-Silver Syndrome Children
- Characteristics of both Small-for-Gestational-Age Children and Russell-Silver Syndrome Patients

### FAQ Section

Sample FAQs:
1. **Q**: Are the cognitive abilities of RSS children within the normal range?
   **A**: An infant with RSS is generally born with normal intelligence...

2. **Q**: What should we do first if we think our child has Russell-Silver syndrome?
   **A**: [Include first steps from website]

3. **Q**: Why are RSS/SGA children at high risk for fasting hypoglycemia and ketonuria?
   **A**: [Include hypoglycemia explanation]

4. **Q**: What are the different treatments needed for Russell-Silver syndrome?
   **A**: [Include treatments information]

5. **Q**: Does an RSS child's delayed bone age mean more growing time later?
   **A**: No. Medical research has found that...

6. **Q**: Do RSS children have early puberty?
   **A**: [Include puberty information]

7. **Q**: Can my RSS child's height be improved?
   **A**: The unequivocal answer to this question is "yes"...

8. **Q**: What are the different benefits and risks of growth hormone therapy other than improving height?
   **A**: [Include GHT benefits and risks]

9. **Q**: Is a GH stimulation test needed for insurance coverage of GHT for RSS/SGA children?
   **A**: [Include insurance information]

10. **Q**: What are some tips in getting GHT covered by insurance?
    **A**: [Include insurance tips]

## Steps to Populate Content

1. **Start Strapi**: Run `npm run develop` in the `magic-foundation` directory
2. **Access Admin Panel**: Navigate to `http://localhost:1337/admin`
3. **Create Entry**: Go to Content Manager → Russell Silver Syndrome → Create new entry
4. **Fill in Tabs**: Populate each tab section with the appropriate components
5. **Add Content**: Use the rich text editor to add content from the MAGIC Foundation website
6. **Publish**: Make sure to publish the entry after creating it

## Notes

- All content should be copied from the MAGIC Foundation website: https://www.magicfoundation.org/russell-silver-syndrome
- Use the rich text editor for formatting
- Images can be uploaded through the media library
- Make sure to populate all four tabs (Overview, Personal Stories, Resources, Division Leaders)
- The frontend will automatically fetch and display this content
