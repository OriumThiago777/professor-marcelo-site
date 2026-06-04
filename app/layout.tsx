import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Professor Marcelo Félix | Urgência e Emergência",
  description:
    "Treinamentos, palestras e formações em saúde, urgência e emergência com o Professor Marcelo Félix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
