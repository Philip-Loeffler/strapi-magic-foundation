const Page = async () => {
  // Static for deploy; restore API fetch when ready for dynamic data
  const emergency = null;

  return (
    <div className="flex justify-center w-full h-full pt-20">
      <div className="flex flex-col w-full justify-center items-center gap-8 w-1/2">
        <div className="text-3xl font-bold">
          Have <span className="text-primaryOrange">Emergency?</span> We are
          here to help.
        </div>
        {emergency?.overView && (
          <div className="text-center">{emergency.overView}</div>
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
    </div>
  );
};

export default Page;
