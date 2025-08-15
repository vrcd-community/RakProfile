'use server';

import { MemberCardWithExpanded } from "./card";
import { fetchAccessToken } from "@/lib/external/Logto";

export default async function Members() {
  const members = await getMembers();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {
          Object.entries(members).map(([group, users]) => (
            <div key={group}>
              <h2 className="text-2xl font-bold mb-4">{group}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map(async ({ user, uid }) => {
                  return <MemberCardWithExpanded key={uid} uid={uid} user={user} />
                })}
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

async function getMembers() {
  const members = {
    "管理社区": [
      // SKP彭彭
      "p0o4awi7xj32",
      // 可可
      "m3ni5rpb8s1a",
      // 风间苏苏
      "uttg5xhfjs4m",
      // 蛋包饭
      "w7szj3prb71h",
      // Misaka-L
      "prk9g38gai6u",
    ]
  }

  const access_token = await fetchAccessToken();

  const users: {
    [key: string]: {
      uid: string,
      user: any
    }[]
  } = {};

  const promises: Promise<void>[] = [];

  for (const group in members) {
    const uids = members[group as keyof typeof members];
    for (const uid of uids) {
      const p = new Promise<void>((resolve, reject) => {
        fetch(`${process.env.LOGTO_BASEURL}/api/users/${uid}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          next: {
            revalidate: 3600,
          },
          cache: "force-cache"
        }).then((res) => {
          return res.json();
        }).then((user) => {
          if (!users[group]) users[group] = [];

          users[group].push({
            uid: uid,
            user: user
          })

          resolve();
        }).catch((err) => {
          reject(err);
        })
      })

      promises.push(p)
    }
  }

  await Promise.all(promises);

  return users;
}