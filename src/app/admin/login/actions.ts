"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { startSession } from "@/lib/auth";
import { checkCredentials, isLoginConfigured } from "@/lib/auth/credentials";
import { WINDOW_MINUTES, clientIp, isRateLimited, recordAttempt } from "@/lib/auth/rate-limit";

const schema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isLoginConfigured()) {
    return { error: "Admin login is not configured on the server yet." };
  }
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter your email and password." };

  const ip = clientIp(await headers());
  if (await isRateLimited(ip)) {
    return { error: `Too many failed attempts. Try again in ${WINDOW_MINUTES} minutes.` };
  }

  const ok = await checkCredentials(parsed.data.email, parsed.data.password);
  await recordAttempt(ip, ok);
  if (!ok) return { error: "Incorrect email or password." };

  await startSession();
  redirect("/admin");
}
