import { z } from "zod";

// --- FOR CHANGING THE NAME OF USER ---
export const UpdateNameSchema = z.object({
  name: z.string().min(1, {
    message: "Name field is must",
  }),
});

export type UpdateNameSchemaType = z.infer<typeof UpdateNameSchema>;

// --- FOR CHANGING THE EMAIL OF USER ---
export const UpdateEmailSchema = z.object({
  email: z.string().email().min(3, {
    message: "A valid email is required",
  }),
});

export type UpdateEmailSchemaType = z.infer<typeof UpdateEmailSchema>;

// --- FOR CHANGING THE PASSWORD OF USER ---
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(9, {
      message: "At least 9 characters needed.",
    }),
    newPassword: z.string().min(9, {
      message: "New password must consist at least nine characters.",
    }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password did not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
