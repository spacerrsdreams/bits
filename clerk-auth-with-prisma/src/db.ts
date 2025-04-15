import {
  ClerkCreateUserWebhookPayload,
  ClerkDeleteUserWebhookPayload,
} from "./clerk.types";
import { prisma } from "@/lib/prisma";

export const createUser = async (data: ClerkCreateUserWebhookPayload) => {
  try {
    const email =
      data.email_addresses[0]?.email_address || "unknown@example.com";

    await prisma.user.create({
      data: {
        clerkId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email,
        imageUrl: data.image_url,
        profileImageUrl: data.profile_image_url,
        createdAt: new Date(data.created_at),
        externalAccounts: {
          create:
            data.external_accounts?.map((account) => ({
              provider: account.provider,
              providerUserId: account.provider_user_id,
              email: account.email_address,
              firstName: account.first_name,
              lastName: account.last_name,
              avatarUrl: account.avatar_url,
            })) || [],
        },
      },
    });

    return { success: true, error: null, message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, error, message: "User creation failed" };
  }
};

export const deleteUser = async (data: ClerkDeleteUserWebhookPayload) => {
  try {
    await prisma.user.update({
      where: { clerkId: data.id },
      data: { deleted: true, deletedAt: new Date() },
    });

    return { success: true, error: null, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error, message: "User deletion failed" };
  }
};
