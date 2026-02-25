import { GrowthChartContentRenderer } from "@/components/growth-chart/GrowthChartContentRenderer";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function GrowthChartsPage() {
  // Static for deploy; restore API fetch when ready for dynamic data
  const growthChartData = null;

  return (
    <PageContainer>
      {growthChartData ? (
        <GrowthChartContentRenderer content={growthChartData} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-left mb-8">Growth Charts</h1>
          <p className="text-muted-foreground">Content coming soon...</p>
        </>
      )}
    </PageContainer>
  );
}
