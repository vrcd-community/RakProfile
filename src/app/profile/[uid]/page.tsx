import UserCard from "@/components/UserCard";

export default async function ProfilePage({ params }: { params: { uid: string } }) {
  const { uid } = await params;
  return <UserCard id={uid} />;
}