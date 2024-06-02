import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function post(request: NextRequest, response: NextResponse) {
    const payload = await request.text();
    const res = JSON.parse(payload);

    const sig = request.headers.get("Stripe-Signature")!;

    const dateTime = new Date(res?.created * 1000).toLocaleDateString();
    const timeString = new Date(res?.created * 1000).toLocaleDateString();

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);

        // if (event.type === "checkout.session.completed") {
        //     console.log(`Payment of ${event.data.object.amount_total / 100} received on ${dateTime} at ${timeString}`);
        // }

       console.log("event", event.type)
       return NextResponse.json({ status: "Success", event });
    }
    catch (error) {
        return NextResponse.json({ status: "Failed", error})
    }
}
