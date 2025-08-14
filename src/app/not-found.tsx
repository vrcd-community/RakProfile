import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-2xl font-mono font-light">
        404 | Not Found
      </h1>
      <Button asChild>
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}