"use server";

// components
import { auth } from "@/lib/auth";
import {
  SignUpSchema,
  SignUpSchemaType,
} from "@/app/(auth)/_schemas/auth-schema";
import { prisma } from "@/lib/prisma";

/**
 * Registers a new user by validating their input and creating a new account.
 *
 * @param {SignUpSchemaType} values - User input values conforming to the SignUpSchemaType.
 *
 * @returns {Promise<{ success: string } | { error: string }>}
 * A promise resolving to an object containing a success message if the user is registered,
 * or an error message if the registration fails.
 *
 * @throws Will throw an error if the user input is invalid, the user already exists,
 * or if an unexpected error occurs during the registration process.
 */

export const signUpAction = async (values: SignUpSchemaType) => {
  const validateFields = SignUpSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { email, confirmPassword, name } = validateFields.data;

  try {
    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // throw existing user error
    if (existingUser) {
      return {
        error: "User with this email already exists. Please sign in.",
      };
    }

    // make signup complete
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password: confirmPassword,
      },
    });

    // throw success message
    return { success: "User has been registered successfully." };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
