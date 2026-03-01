import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LandingHeroCarousel } from "@/components/landing/LandingHeroCarousel";
import { LandingRichText } from "@/components/landing/LandingRichText";

function getImageUrl(image: any): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (image.url)
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  if (image.data?.attributes?.url)
    return `${baseUrl}${image.data.attributes.url}`;
  return "";
}

function buildLandingPopulateQuery(): string {
  const populate = [
    "heroCarousel",
    "heroCarousel.backgroundImage",
    "cards",
    "cards.image",
    "ctaBannerBackgroundImage",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getLandingData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!strapiUrl) return null;
    const res = await fetch(
      `${strapiUrl}/api/landing-page?${buildLandingPopulateQuery()}`,
      { cache: "no-store", headers: { "Content-Type": "application/json" } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? data;
  } catch {
    return null;
  }
}

export default async function Page() {
  const landing = await getLandingData();
  const attrs = landing?.attributes ?? landing;
  const hasData =
    attrs &&
    (attrs.heroCarousel?.length > 0 ||
      attrs.mainTitle ||
      attrs.cards?.length > 0);

  return (
    <main className="h-full">
      {/* Hero Carousel */}
      {hasData && attrs.heroCarousel?.length > 0 ? (
        <LandingHeroCarousel slides={attrs.heroCarousel} />
      ) : (
        <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[500px] overflow-hidden bg-slate-800 flex items-center justify-center text-white">
          <span className="text-lg">
            Hero carousel — add slides in Strapi Landing Page
          </span>
        </div>
      )}

      {/* Title */}
      <div className="flex justify-center w-full pt-10 px-4">
        <div className="flex flex-col justify-center items-center gap-8 max-w-3xl text-center">
          {hasData && (attrs.mainTitle || attrs.mainTitleHighlight) ? (
            <h1 className="text-3xl sm:text-4xl font-bold">
              {attrs.mainTitle}{" "}
              {attrs.mainTitleHighlight && (
                <span className="text-primaryBlue">
                  {attrs.mainTitleHighlight}
                </span>
              )}
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-4xl font-bold">
              MAGIC Foundation for{" "}
              <span className="text-primaryBlue">Children&apos;s Growth</span>
            </h1>
          )}

          {/* Description */}
          {hasData && attrs.description ? (
            <div className="text-center text-muted-foreground">
              <LandingRichText content={attrs.description} />
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              MAGIC Foundation is the global leader in endocrine health,
              advocacy, education, and support. Children fail to grow for a
              variety of reasons. Hormones, genetics, sleep, nutrition, general
              health and exercise are all factors for normal growth. If you
              suspect that your child is not growing normally, you are in the
              right place!{" "}
              <Link href="/" className="text-primary underline">
                Click here
              </Link>{" "}
              to request help in finding a specialist.
            </p>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-16 pb-8 px-4">
        {hasData && attrs.cards?.length > 0 ? (
          attrs.cards.map((card: any, index: number) => {
            const imgUrl = card.image ? getImageUrl(card.image) : null;
            const href = card.buttonLink || "#";
            return (
              <Card
                key={index}
                className="w-full max-w-[360px] overflow-hidden"
              >
                {imgUrl && (
                  <div className="relative w-full aspect-[360/265] bg-muted">
                    <Image
                      src={imgUrl}
                      alt={card.title || ""}
                      fill
                      className="object-cover"
                      sizes="360px"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{card.title || "Card"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {card.description || ""}
                  </p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild size="lg" variant="outline">
                    <Link href={href}>{card.buttonLabel || "Learn More"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <>
            <Card className="w-full max-w-[360px] overflow-hidden">
              <Image
                src="/endocrine-disorder.png"
                width={360}
                height={265}
                alt="Endocrine Disorders"
                className="w-full h-auto object-cover"
              />
              <CardHeader>
                <CardTitle>Endocrine Disorders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  There are hundreds of medical conditions that can affect a
                  child&apos;s growth. If you or your child has been diagnosed
                  with a growth disorder, this is the perfect place to start.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/disorders">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full max-w-[360px] overflow-hidden">
              <Image
                src="/child-growing.png"
                width={360}
                height={265}
                alt="Is Your Child Growing?"
                className="w-full h-auto object-cover"
              />
              <CardHeader>
                <CardTitle>Is Your Child Growing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you suspect your child is not growing properly, you have
                  come to the right place. Read about how to properly measure
                  your child.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/growth-charts">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full max-w-[360px] overflow-hidden">
              <Image
                src="/adult-disorder.png"
                width={360}
                height={265}
                alt="Adult Disorders"
                className="w-full h-auto object-cover"
              />
              <CardHeader>
                <CardTitle>Adult Disorders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Growth Hormone Deficiency in Adults can be an extremely
                  difficult process to diagnose. Often symptoms build slowly as
                  people age.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/disorders/growth-hormone-deficiency-adults">
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>

      {/* CTA Banner */}
      <div className="relative flex items-center justify-center pt-0 min-h-[280px]">
        {hasData && attrs.ctaBannerBackgroundImage ? (
          <>
            <div className="absolute inset-0 -z-10 min-h-[280px]">
              <Image
                src={getImageUrl(attrs.ctaBannerBackgroundImage)}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative flex flex-col items-center gap-4 px-4 text-center py-12">
              {attrs.ctaBannerText && (
                <p className="text-white text-xl sm:text-2xl max-w-3xl">
                  {attrs.ctaBannerText}
                </p>
              )}
              {attrs.ctaBannerButtonLabel && attrs.ctaBannerButtonLink && (
                <Button asChild size="lg" className="bg-primaryBlue font-bold">
                  <Link href={attrs.ctaBannerButtonLink}>
                    {attrs.ctaBannerButtonLabel}
                  </Link>
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <Image
              src="/join-foundation.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              alt="Join MAGIC Foundation"
              // className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-black/40 -z-10" />
            <div className="absolute inset-0 flex items-center flex-col gap-4 justify-center px-4">
              <p className="text-white text-xl sm:text-2xl max-w-3xl text-center">
                Joining MAGIC Foundation has incredible member benefits
                including a quarterly newsletter, discounts on events, and best
                of all you are supporting the world&apos;s leading advocacy and
                information group helping thousands of families.
              </p>
              <Button asChild size="lg" className="bg-primaryBlue font-bold">
                <Link href="/give">JOIN THE MAGIC FOUNDATION TODAY</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
