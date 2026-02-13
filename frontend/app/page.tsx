import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <main className="h-full">
        <div className="flex justify-center w-full pt-20">
          <div className="flex flex-col justify-center items-center gap-8 w-1/2">
            <Button size="lg" className="bg-primaryBlue font-bold">
              JOIN THE MAGIC FOUNDATION TODAY
            </Button>
            <div className="text-3xl">
              MAGIC Foundation for Childrens Growth
            </div>
            <div className="text-center">
              MAGIC Foundation is the global leader in endocrine health,
              advocacy, education, and support. Children fail to grow for a
              variety of reasons. Hormones, genetics, sleep, nutrition, general
              health and exercise are all factors for normal growth. If you
              suspect that your child is not growing normally, you are in the
              right place! Click here to request help in finding a specialist.
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-24 pt-20">
          <Card className="w-[360px]">
            <Image
              src={"/endocrine-disorder.png"}
              width={360}
              height={265}
              alt="Magic Foundation Logo"
            />

            <CardHeader>
              <CardTitle>Endocrine Disorder</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                There are hundreds of medical conditions that can affect a
                childs growth. If you or your child has been diagnosed with a
                growth disorder, this is the perfect place to start. Read about
                different disorders and their treatment.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Button size="lg" variant="outline">
                learn More
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-[360px]">
            <Image
              src={"/child-growing.png"}
              width={360}
              height={265}
              alt="Magic Foundation Logo"
            />

            <CardHeader>
              <CardTitle>Is Your Child Growing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you suspect your child is not growing properly, you have come
                to the right place. Physical growth failure is often the first
                sign of an underlying medical condition. Read about how to
                properly measure your child.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Button size="lg" variant="outline">
                learn More
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-[360px]">
            <Image
              src={"/adult-disorder.png"}
              width={360}
              height={265}
              alt="Magic Foundation Logo"
            />

            <CardHeader>
              <CardTitle>Adult Disorder</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Growth Hormone Deficiency in Adults can be an extremely
                difficult process to diagnose. Often symptoms build slowly as
                people age. Patients as well as physicians are challenged to try
                and sort out what is normal aging.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Button size="lg" variant="outline">
                learn More
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="relative flex items-center justify-center pt-20">
          <Image
            src={"/join-foundation.png"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
            alt="Magic Foundation Join"
          />
          <div className="absolute inset-0 flex items-center flex-col gap-4 justify-center">
            <div className="text-white text-2xl max-w-[60%] text-center">
              Joining MAGIC Foundation has incredible member benefits including
              a quarterly newsletter, discounts on events, and best of all you
              are supporting the worlds leading advocacy and information group
              help thousands of families.
            </div>
            <div className="max-w-[60%]">
              <Button size="lg" className="bg-primaryBlue font-bold">
                JOIN THE MAGIC FOUNDATION TODAY
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
