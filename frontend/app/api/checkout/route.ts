import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

/**
 * Dynamic checkout: accepts any product name and amount (e.g. donations).
 * Use across the app for Stripe Checkout; product naming can be refined later.
 *
 * Body: productName, unitAmount (cents), quantity, optional description/metadata
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productName,
      unitAmount,
      quantity = 1,
      description,
      metadata,
    } = body;

    if (!productName || productName.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or missing productName" },
        { status: 400 }
      );
    }

    const amount = Number(unitAmount);
    if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 1) {
      return NextResponse.json(
        { error: "Invalid or missing unitAmount (must be a positive integer in cents)" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName.trim(),
              description:
                typeof description === "string" && description
                  ? description
                  : productName.trim(),
              ...(metadata && typeof metadata === "object" ? { metadata } : {}),
            },
            unit_amount: amount,
          },
          quantity: Math.max(1, Math.floor(Number(quantity)) || 1),
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/give?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/give`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
