import UserCard from "@/components/UserCard";

export default async function ProfilePage({ params, searchParams }: any) {
  const { uid } = await params;
  const { edit } = await searchParams;
  return <UserCard id={uid} edit={edit ? true : false}/>;
}