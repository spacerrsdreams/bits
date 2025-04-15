import {
  ClerkCreateUserWebhookPayload,
  ClerkDeleteUserWebhookPayload,
  ClerkEventT,
} from "@/clerk.types";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { createUser, deleteUser } from "@/db";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type as ClerkEventT;
    const payload = evt.data;

    switch (eventType) {
      case "user.created":
        const { error: createError } = await createUser(
          payload as unknown as ClerkCreateUserWebhookPayload
        );

        if (createError) {
          return new Response("Error creating user", { status: 400 });
        }
        break;
      case "user.deleted":
        const { error: deleteError } = await deleteUser(
          payload as unknown as ClerkDeleteUserWebhookPayload
        );

        if (deleteError) {
          return new Response("Error deleting user", { status: 400 });
        }
        break;
      default:
        return new Response("Unknown event type", { status: 400 });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
