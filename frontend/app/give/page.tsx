import { GiveForm } from "./GiveForm";

const CAUSES = [
  "Growth Champion (Growth Awareness Week)",
  "General Donation",
  "Honorary Donation",
  "Memorial Donation",
  "RSS/SGA/Temple Research & Education Fund",
  "$75 External Appeal Assistance Fee",
  "Philanthropic Societies",
];

export default function GivePage() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Hero */}
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Make a Donation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your financial support has a direct impact on MAGIC&apos;s advocacy,
            dissemination of credible information, and support for patients and
            families.
          </p>
          <p className="mt-2 text-muted-foreground">
            Please consider a gift of any amount. Choose from the donation types
            below and complete the form to make a donation. For External Appeal
            Assistance, the fee is $75.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            The MAGIC Foundation&apos;s Tax ID# 36-3673333.
          </p>
        </header>

        {/* Form card */}
        <div className="mt-10">
          <GiveForm causes={CAUSES} />
        </div>

        {/* Donate by Mail / Phone */}
        <section className="mt-14 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-foreground">
                Donate by Mail
              </h3>
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                The MAGIC Foundation
                {"\n"}4200 Cantera Dr., Suite 106
                {"\n"}Warrenville, IL  60555
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Donate by Phone
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                1-800-3 MAGIC 3 (1-800-362-4423) or (630) 836-8200
              </p>
            </div>
          </div>
        </section>

        {/* Contact note */}
        <p className="mt-6 text-center text-sm text-muted-foreground max-w-xl mx-auto">
          If you have questions about donating, please email{" "}
          <a
            href="mailto:ContactUs@magicfoundation.org"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            ContactUs@magicfoundation.org
          </a>{" "}
          or call (630) 836-8200. Your contribution is tax-deductible as
          described on your receipt and to the extent allowed by law. Note:
          Donations must be received by The MAGIC Foundation on, or before,
          December 31st, to be deductible in that tax year.
        </p>
      </div>
    </div>
  );
}
