import PotDetailClient from "./PotDetailClient";

export default async function PotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PotDetailClient id={Number(id)} />;
}
