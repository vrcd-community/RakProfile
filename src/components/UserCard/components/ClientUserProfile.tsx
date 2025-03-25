'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "./UserProfile";
import { BookStackStats } from "./BookStackStats";
import { useSettings } from "./settings/SettingsContext";

export function ClientUserProfile() {
  const { targetUser, isAdmin, customData, stats, books, editedBooks } = useSettings();

  if (!targetUser || !stats || !books || !editedBooks) return null;

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card className="w-full">
        <UserProfile />
        <Separator />
        <CardContent className="grid gap-6">
          <BookStackStats
            stats={stats}
            books={books}
            editedBooks={editedBooks}
          />
        </CardContent>
      </Card>
    </div>
  );
}