"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { signUpSchema } from "../schemas/zodSchemas";
import crypto from "crypto";

export async function CreateUser(prevState: unknown, formData: FormData) {
  console.log(formData);
  const submission = parseWithZod(formData, {
    schema: signUpSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const token = crypto.randomBytes(32).toString("hex");

  const data = {
    name: formData.get("name"),
    orgName: formData.get("orgName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    phone: formData.get("phone"),
  }

  // Send the form data to the API route
  const response = await fetch("https://crowdshaki.vercel.app/api/createUser", {
    method: "POST",
    body: JSON.stringify({
      data,
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  // Redirect to success page
  return redirect("/success");
}
