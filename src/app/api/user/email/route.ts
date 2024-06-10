import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: Request) {
	const body = await request.json();
	const { email } = body;

	if (!email) {
		return new NextResponse("Missing Fields", { status: 400 });
	}

	const formatedEmail = email.toLowerCase();

	const user = await prisma.user.findUnique({
		where: {
			email: formatedEmail,
		},
	});

	if (!user) {
		return new NextResponse("User doesn't exist", { status: 400 });
	}

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
