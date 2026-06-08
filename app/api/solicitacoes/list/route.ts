import { NextResponse } from "next/server";

type NotionPage = {
  id: string;
  created_time: string;
  properties: {
    Nome?: { title?: { text?: { content?: string } }[] };
    WhatsApp?: { phone_number?: string };
    Cidade?: { rich_text?: { text?: { content?: string } }[] };
    "Curso de Interesse"?: { select?: { name?: string } };
    Status?: { select?: { name?: string } };
  };
};

export async function GET() {
  const databaseId = process.env.NOTION_DB_SOLICITACOES_MARCELO;
  const token = process.env.NOTION_TOKEN;

  if (!databaseId || !token) {
    return NextResponse.json({ error: "Missing env vars." }, { status: 500 });
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [{ timestamp: "created_time", direction: "descending" }],
        page_size: 100,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from Notion." },
      { status: 500 },
    );
  }

  const json = await response.json();

  const results = (json.results as NotionPage[]).map((page) => ({
    id: page.id,
    nome: page.properties.Nome?.title?.[0]?.text?.content ?? "",
    whatsapp: page.properties.WhatsApp?.phone_number ?? "",
    cidade: page.properties.Cidade?.rich_text?.[0]?.text?.content ?? "",
    curso: page.properties["Curso de Interesse"]?.select?.name ?? "",
    status: page.properties.Status?.select?.name ?? "",
    data: new Date(page.created_time).toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    }),
  }));

  return NextResponse.json(results);
}
