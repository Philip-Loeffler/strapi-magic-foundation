"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InsuranceAppealsContentRenderer } from "@/components/insurance-appeals/InsuranceAppealsContentRenderer";

const TABS = [
  { slug: "overview", title: "Overview" },
  { slug: "faq", title: "FAQ" },
  { slug: "appeal-process", title: "Appeal Process" },
  { slug: "patient-assistance", title: "Patient Assistance" },
] as const;

export function InsuranceTabsClient({ data }: { data: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full flex flex-col">
        <Tabs defaultValue="overview" className="w-full flex flex-col">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-3xl grid-cols-4 gap-1 h-auto p-1 bg-muted rounded-lg">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.slug}
                  value={tab.slug}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md py-2 text-sm"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        <div className="w-full min-h-[200px]">
          {data?.overviewTab ? (
            <InsuranceAppealsContentRenderer
              content={data.overviewTab}
              tab="overview"
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Content coming soon...
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="overview" className="w-full flex flex-col">
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-3xl grid-cols-4 gap-1 h-auto p-1 bg-muted rounded-lg">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.slug}
              value={tab.slug}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md py-2 text-sm"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="overview" className="w-full mt-0">
        {data?.overviewTab ? (
          <InsuranceAppealsContentRenderer
            content={data.overviewTab}
            tab="overview"
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Content coming soon...
          </div>
        )}
      </TabsContent>

      <TabsContent value="faq" className="w-full mt-0">
        {data?.faqTab ? (
          <InsuranceAppealsContentRenderer content={data.faqTab} tab="faq" />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            FAQ content coming soon...
          </div>
        )}
      </TabsContent>

      <TabsContent value="appeal-process" className="w-full mt-0">
        {data?.appealProcessTab ? (
          <InsuranceAppealsContentRenderer
            content={data.appealProcessTab}
            tab="appeal-process"
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Appeal process content coming soon...
          </div>
        )}
      </TabsContent>

      <TabsContent value="patient-assistance" className="w-full mt-0">
        {data?.patientAssistanceTab ? (
          <InsuranceAppealsContentRenderer
            content={data.patientAssistanceTab}
            tab="patient-assistance"
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Patient assistance content coming soon...
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
