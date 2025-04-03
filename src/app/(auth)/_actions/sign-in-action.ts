"use server";

// local modules
import { auth } from "@/lib/auth";
import {
  SignInSchema,
  SignInSchemaType,
} from "@/app/(auth)/_schemas/auth-schema";
import { prisma } from "@/lib/prisma";

/**
 * Authenticates a user by validating their email and password.
 *
 * @param {SignInSchemaType} values - User input values conforming to the SignInSchemaType.
 *
 * @returns {Promise<{ success: string } | { error: string }>}
 * A promise resolving to an object containing a success message if the user is authenticated,
 * or an error message if the authentication fails.
 *
 * @throws Will throw an error if the user input is invalid, the user does not exist,
 * or if an unexpected error occurs during the authentication process.
 */

export const signInAction = async (values: SignInSchemaType) => {
  const validateFields = SignInSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { email, password } = validateFields.data;

  try {
    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // throw existing user error
    if (!existingUser) {
      return {
        error: "User with this email does not exist. Please sign up.",
      };
    }

    // make signup complete
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    // throw success message
    return { success: "User has been logged in successfully." };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
