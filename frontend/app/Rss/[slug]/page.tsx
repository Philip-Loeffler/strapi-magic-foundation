import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  console.log(slug, "slug param");
  const data = await fetch(
    `http://localhost:1337/api/russell-silver-syndromes?populate=*`
  ).then((r) => r.json());

  const entry = data?.data?.[0];
  const tabs = entry?.tabs; // ✅ correct
  console.log(entry, "entry");

  const tab = tabs?.find((t: any) => t.slug === slug);
  console.log(tab, "tab");

  if (!tab) return <div>Not Found</div>;

  return (
    <div>
      <div className="flex flex-row w-full items-center justify-center">
        <Tabs defaultValue={slug} className="w-full">
          <div className="flex justify-center">
            <TabsList className="grid w-1/2 grid-cols-4">
              {tabs?.map((t: any) => (
                <TabsTrigger key={t.slug} value={t.slug}>
                  {t.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((t: any) => (
            <TabsContent key={t.slug} value={t.slug}>
              <RichTextRenderer content={t.content} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
export function RichTextRenderer({ content }: { content: any }) {
  console.log(content, "content");
  if (!content) return null;

  return content.map((node: any, i: number) => {
    switch (node.type) {
      case "list": {
        const ListTag = node.format === "unordered" ? "ul" : "ol";
        return (
          <ListTag key={i} className="pl-6 space-y-1 list-disc">
            {node.children?.map((item: any, j: number) => (
              <li key={j}>
                {item.children?.map((child: any, k: number) => child.text)}
              </li>
            ))}
          </ListTag>
        );
      }

      case "paragraph":
        return (
          <p key={i}>
            {node.children?.map((child: any, k: number) => child.text)}
          </p>
        );

      default:
        return null;
    }
  });
}
