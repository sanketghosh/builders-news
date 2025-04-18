"use server";

import { prisma } from "@/lib/prisma";
import {
  MakePostSchema,
  MakePostSchemaType,
} from "@/app/(main)/make-post/_schemas";
import { getSessionData } from "@/utils/get-session";

/**
 *
 * @param {MakePostSchemaType} values - User input values conforming to the MakePostSchemaType.
 *
 */

export const makePostAction = async (values: MakePostSchemaType) => {
  const validateFields = MakePostSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { title, body } = validateFields.data;

  try {
    const { authenticatedUserId } = await getSessionData();

    if (!authenticatedUserId) {
      return {
        error: "User must be authenticated.",
      };
    }

    await prisma.post.create({
      data: {
        authorId: authenticatedUserId,
        title: title,
        body: body || "",
      },
    });

    return {
      success: "Your post has been posted.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
