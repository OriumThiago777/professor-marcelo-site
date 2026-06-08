import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { id, status } = (await request.json()) as {
    id?: string;
    status?: string;
  };

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status." },
      { status: 400 },
    );
  }

  const token = process.env.NOTION_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 500 });
  }

  const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        Status: { select: { name: status } },
      },
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
