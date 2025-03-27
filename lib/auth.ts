import { parse, serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const createToken = (user: { id: number; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const setTokenCookie = (res: NextApiResponse, token: string) => {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 1 day
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const verifyToken = async (req: NextApiRequest) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true },
    });

    return user;
  } catch (error) {
    return null;
  }
};
