"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InsuranceAppealsContentRenderer } from "@/components/insurance-appeals/InsuranceAppealsContentRenderer";

const TABS = [
  { slug: "overview", title: "Overview" },
  { slug: "faq", title: "FAQ" },
  { slug: "appeal-process", title: "Appeal Process" },
  { slug: "follow-up-procedure", title: "Follow up Procedure" },
  { slug: "patient-assistance", title: "Patient Assistance" },
] as const;

export function InsuranceTabsClient({ data }: { data: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl flex flex-col">
        <div className="grid grid-cols-5 gap-1 h-auto p-1 bg-muted rounded-lg mb-8">
          {TABS.map((tab) => (
            <div
              key={tab.slug}
              className={`rounded-md py-2 text-sm text-center ${
                tab.slug === "overview"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {tab.title}
            </div>
          ))}
        </div>
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
    <Tabs defaultValue="overview" className="w-full max-w-4xl flex flex-col">
      <TabsList className="grid w-full grid-cols-5 gap-1 h-auto p-1 bg-muted rounded-lg mb-8">
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

      <TabsContent value="follow-up-procedure" className="w-full mt-0">
        {data?.followUpProcedureTab ? (
          <InsuranceAppealsContentRenderer
            content={data.followUpProcedureTab}
            tab="follow-up-procedure"
          />
        ) : (
          <InsuranceAppealsContentRenderer
            content={null}
            tab="follow-up-procedure"
          />
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
