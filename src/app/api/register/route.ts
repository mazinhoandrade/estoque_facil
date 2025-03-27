import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 },
      );
    }

    // Verifica se o email já existe
    const userExists = await prisma.user.findUnique({ where: { email } });
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (userExists) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 },
      );
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({
      message: "Usuário cadastrado com sucesso!",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 },
    );
  }
}
