import { PageContainer } from "@/components/layout/PageContainer";

const Page = async () => {
  // Static for deploy; restore API fetch when ready for dynamic data
  type EmergencyData = {
    overView: string;
  };
  const emergency = null as EmergencyData | null;

  return (
    <PageContainer>
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <h1 className="text-3xl font-bold text-left">
          Have <span className="text-primaryOrange">Emergency?</span> We are
          here to help.
        </h1>
        {emergency?.overView && (
          <div className="text-left">{emergency.overView}</div>
        )}
        {/* {emergency?.emergencyAccordion &&
          emergency.emergencyAccordion.length > 0 && (
            <div className="flex self-start p-24 w-full">
              <Accordion className="w-full" type="single" collapsible>
                {emergency.emergencyAccordion.map((x, i) => (
                  <AccordionItem key={i} value={x.geneticDisorderName}>
                    <AccordionTrigger className="font-bold">
                      {x.geneticDisorderName}
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-2">
                      {x.geneticDisorderResponse?.map((item) => (
                        <li key={item.geneticRsponseTitle}>
                          <span className="pl-2">
                            <span className="font-bold">
                              {item.geneticRsponseTitle}
                            </span>{" "}
                            {item.geneticRsponseAnswer}
                          </span>
                        </li>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )} */}
      </div>
    </PageContainer>
  );
};

export default Page;
