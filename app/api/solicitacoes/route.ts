import { NextResponse } from "next/server";

const WHATSAPP_NUMBER = "5531991207009";

type SolicitacaoPayload = {
  nome: string;
  whatsapp: string;
  cidade: string;
  curso: string;
  status: "Novo" | "Aguardando aviso";
};

async function saveToNotion(data: SolicitacaoPayload) {
  try {
    const databaseId = process.env.NOTION_DB_SOLICITACOES_MARCELO;
    const token = process.env.NOTION_TOKEN;
    if (!databaseId || !token) return;

    await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Nome: { title: [{ text: { content: data.nome } }] },
          WhatsApp: { phone_number: data.whatsapp },
          Cidade: { rich_text: [{ text: { content: data.cidade } }] },
          "Curso de Interesse": { select: { name: data.curso } },
          Status: { select: { name: data.status } },
        },
      }),
    });
  } catch {
    // soft-fail: a solicitação segue mesmo se o Notion estiver indisponível
  }
}

export async function POST(request: Request) {
  const { nome, whatsapp, cidade, curso } =
    (await request.json()) as Partial<SolicitacaoPayload>;

  if (!nome || !whatsapp || !curso) {
    return NextResponse.json(
      { success: false, error: "Preencha todos os campos." },
      { status: 400 },
    );
  }

  const status = cidade ? "Novo" : "Aguardando aviso";
  await saveToNotion({ nome, whatsapp, cidade: cidade ?? "", curso, status });

  const message = cidade
    ? `Olá! Me chamo ${nome}, tenho interesse no curso ${curso}. Sou de ${cidade}.`
    : `Olá! Me chamo ${nome}, tenho interesse no curso ${curso}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return NextResponse.json({ success: true, whatsappUrl });
}
