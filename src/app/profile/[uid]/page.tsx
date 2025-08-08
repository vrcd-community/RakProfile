import UserCardV2 from "@/components/UserCardV2";

export default async function ProfilePage({ params, searchParams }: any) {
  const { uid } = await params;
  return <UserCardV2 uid={uid}/>;
}