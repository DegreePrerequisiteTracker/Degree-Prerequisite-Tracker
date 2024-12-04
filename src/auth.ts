import type { Request } from "express";
import createHttpError from "http-errors";

const supabaseUrl = process.env.SUPABASEURL!;
const apiKey = process.env.SUPABASEKEY!;

export interface UserData {
  id: string;
  email: string | undefined;
}

type AuthResponse =
  | { id: string; email: string | undefined }
  | {
      code: number;
      error_code: string;
      msg: string;
    };

export async function authUser(req: Request): Promise<UserData> {
  const auth = req.get("Authorization");

  if (!auth) throw createHttpError.Unauthorized();

  const result = (await fetch(`${supabaseUrl}/auth/v1/user`, {
    method: "GET",
    headers: {
      Authorization: auth,
      Apikey: apiKey,
    },
  }).then((res) => res.json())) as AuthResponse;

  if ("code" in result) {
    throw createHttpError(result.code, result.msg);
  }

  return {
    id: result.id,
    email: result.email,
  };
}
