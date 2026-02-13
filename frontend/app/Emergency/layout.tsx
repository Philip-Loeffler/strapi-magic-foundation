import { AwardBanner } from "@/components/ui/awardBanner";

export default function EmergencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="px-6 py-4">{children}</div>
      <AwardBanner />
    </section>
  );
}
