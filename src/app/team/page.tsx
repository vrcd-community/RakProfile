'use server';

import { MemberCardWithExpanded } from "./card";
import { fetchAccessToken } from "@/lib/external/Logto";

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

export default async function Members() {
  const access_token = await fetchAccessToken();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {
          Object.entries(members).map(([group, uids]) => (
            <div key={group}>
              <h2 className="text-2xl font-bold mb-4">{group}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uids.map(async uid => {
                  const resp = await fetch(`${process.env.LOGTO_BASEURL}/api/users/${uid}`, {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${access_token}`,
                    }
                  });

                  const user = await resp.json();
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