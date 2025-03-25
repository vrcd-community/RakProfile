'use client';

import { Card } from "@/components/ui/card";
import { SettingsProvider } from "./SettingsContext";
import { SecuritySettings } from "./SecuritySettings";
import "@/app/markdown.css";

export function ClientUserSettings() {
  return (
    <SettingsProvider>
      <div className="container max-w-4xl mx-auto py-10">
        <Card className="w-full">
          <div className="space-y-6">
            <div className="px-6 pb-6">
              <SecuritySettings />
            </div>
          </div>
        </Card>
      </div>
    </SettingsProvider>
  );
} 