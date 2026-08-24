import { redirect } from "next/navigation";

export default async function ChunksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  redirect(`/knowledge-bases/${id}/documents`);
}