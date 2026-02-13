import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
  const tabs = [
    {
      title: "OverView",
    },
  ];
  return (
    <div className="flex flex-row w-full items-center justify-center">
      <Tabs defaultValue="OverView" className="w-full">
        <div className="flex justify-center">
          <TabsList className="grid w-1/2 grid-cols-6">
            {tabs.map((x) => (
              <TabsTrigger key={x.title} value={x.title}>
                {x.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((x) => (
          <TabsContent key={x.title} className="w-full" value={x.title}>
            <div className="w-full space-y-4 py-4">
              {x.title === "OverView" && (
                <div className="grid grid-cols-2 gap-10 w-full">
                  <div className="grid col-span-1">
                    <div>
                      Russell-Silver syndrome (or Silver-Russell syndrome) is a
                      rare genetic disorder characterized by delayed growth
                      in-utero (IUGR) that spares head growth (meaning the
                      newborn has a head size that is large for his body) and
                      ongoing postnatal growth failure.  This disorder includes
                      feeding difficulties and/or low BMI, dysmorphic features
                      including a protruding forehead, and frequently body
                      asymmetry (hemihypotrophy).  The true incidence is unknown
                      but is estimated at 1 per every 35,000 – 100,000 live
                      births.   It was way back in 1953 and 1954 that Dr. Silver
                      and Dr. Russell independently described groups of
                      small-for-gestational-age [SGA] children whose pregnancies
                      had been complicated by intrauterine growth restriction
                      [IUGR]. Their common findings were short stature without
                      catch-up growth, normal head size for age, a distinctive
                      triangular face, low-set ears and incurving fifth fingers.
                      These two groups of patients are now considered to have
                      had variations of the same disorder that we now call
                      Russell-Silver syndrome [RSS] in North America, and
                      Silver-Russell syndrome [SRS] in Europe.   One interesting
                      and important aspect of the Russell-Silver syndrome is its
                      variation in phenotype. In this context, a phenotype is
                      all the physical characteristics and abnormalities found
                      in an individual patient that are attributed specifically
                      to RSS. Some individuals with RSS have many traits, thus a
                      severe phenotype, while others have very few traits, thus
                      a mild phenotype.   When first described, RSS was NOT
                      thought to be a genetic disorder because it recurred
                      within families rarely, and when it did recur, its pattern
                      of transmission failed to follow a consistent genetic mode
                      of inheritance. More recent understandings of genetic
                      mechanisms have led scientists to conclude that
                      Russell-Silver syndrome is genetic, but its genetics are
                      not simple. Scientists now know that the RSS phenotype is
                      associated with more than one genotype.   A genotype is
                      the status of a specific gene at a specific location on a
                      specific chromosome. Therefore, an abnormal genotype means
                      there has been a specific alteration, such as a deletion,
                      duplication, insertion, substitution or imprinting error
                      within the code of a specific gene located at a specific
                      site in an individual's genetic code.   Since our genotype
                      is responsible for our phenotype, abnormal genotypes
                      result in abnormal phenotypes. If we assume several
                      genotypes for Russell-Silver syndrome, then we should not
                      be surprised at a variety of phenotypes. We view this as
                      one reason for the marked variability within the group of
                      patients considered to have RSS. But deciding which child
                      should be considered to have RSS is not always easy. When
                      more is known about the genetics of Russell-Silver
                      syndrome, we will find that some patients were incorrectly
                      included while others were incorrectly excluded.
                    </div>
                  </div>
                  <div className="grid col-span-1">
                    <Image
                      src={"/laugh.png"}
                      width={364}
                      height={254}
                      alt="phone"
                    />
                  </div>
                </div>
              )}

              <Accordion className="w-full" type="single" collapsible>
                {/* {x.questionsAndAnswers.map((component) => (
                  <AccordionItem key={component.question} value={component.question}>
                    <AccordionTrigger>{component.question}</AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-2">
                      <li>
                        <span className="font-bold">{component.question}:</span>
                        <span className="pl-2">{component.answer}</span>
                      </li>
                    </AccordionContent>
                  </AccordionItem>
                ))} */}
              </Accordion>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Page;
