"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourcesContentRenderer } from "@/components/resources/ResourcesContentRenderer";

const TABS = [
  { slug: "overview", title: "Overview" },
  { slug: "informational-videos", title: "Informational Videos" },
  { slug: "get-support", title: "Get Support" },
  { slug: "spread-the-word", title: "Spread the Word" },
] as const;

export function ResourcesTabsClient({ data }: { data: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full flex flex-col">
        <div className="flex justify-center mb-8">
          <div className="grid w-full max-w-3xl grid-cols-4 gap-1 h-auto p-1 bg-muted rounded-lg">
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
        </div>
        <div className="w-full min-h-[200px]">
          <ResourcesContentRenderer
            content={data?.overviewTab}
            tab="overview"
          />
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
        <ResourcesContentRenderer content={data?.overviewTab} tab="overview" />
      </TabsContent>

      <TabsContent value="informational-videos" className="w-full mt-0">
        {data?.informationalVideosTab ? (
          <ResourcesContentRenderer
            content={data.informationalVideosTab}
            tab="informational-videos"
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Content coming soon...
          </div>
        )}
      </TabsContent>

      <TabsContent value="get-support" className="w-full mt-0">
        {data?.getSupportTab ? (
          <ResourcesContentRenderer
            content={data.getSupportTab}
            tab="get-support"
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Content coming soon...
          </div>
        )}
      </TabsContent>

      <TabsContent value="spread-the-word" className="w-full mt-0">
        {data?.spreadTheWordTab ? (
          <ResourcesContentRenderer
            content={data.spreadTheWordTab}
            tab="spread-the-word"
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Content coming soon...
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
