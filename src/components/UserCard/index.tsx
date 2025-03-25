'use server';

import { ServerUserProfile } from "./components/ServerUserProfile";

export default async function UserProfilePage({ id }: { id: string, edit: boolean }) {
  return <ServerUserProfile id={id} />;
}