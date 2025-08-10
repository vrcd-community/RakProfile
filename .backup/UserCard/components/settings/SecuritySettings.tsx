'use client';

import { Separator } from '@/components/ui/separator';
import { ChangePassword } from './ChangePassword';
import MFA from './MFA';
import SocialIdentity from './SocialIdentity';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="px-6">
        <ChangePassword />
      </div>
      <Separator className="my-8" />
      <div className="px-6">
        <MFA />
      </div>
      <Separator className="my-8" />
      <div className="px-6">
        <SocialIdentity />
      </div>
    </div>
  );
}