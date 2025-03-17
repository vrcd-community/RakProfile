import LeaderboardPage from "@/components/Leaderboard";

export default function Home() {
  return (
    <div>
      <LeaderboardPage />
    </div>
  );
}

// 强制关闭预渲染
export const dynamic = 'force-dynamic';