import prisma from "../db";

interface IContribution {
  source: string; // bookstack, bbs
  resourceId: string;
  date: Date;
  type: "create" | "edit";
  logto_id: string;
  message?: string;
  url?: string;
}

export const appendContributions = async (contributions: IContribution) => {
  const full_id = `${contributions.source}:${contributions.resourceId}`;

  const isDupe = await prisma.contributions_history.findMany({
    where: {
      resource_id: full_id,
      logto_id: contributions.logto_id,
      date: contributions.date,
      type: contributions.type,
    }
  })

  if (isDupe.length > 0) {
    return true;
  }

  console.log(`[${new Date().toISOString()}][Contributions] Appending contribution (${contributions.type}) ${full_id} for ${contributions.logto_id}`)

  await prisma.contributions_history.create({
    data: {
      resource_id: full_id,
      logto_id: contributions.logto_id,
      date: contributions.date,
      type: contributions.type,
      message: contributions.message,
      url: contributions.url
    }
  });

  return false;
};