import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorCardProps {
  title: string;
  description: string;
  error?: any;
}

export function ErrorCard({ title, description, error }: ErrorCardProps) {
  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
          {error && <CardDescription className="text-sm text-gray-500">错误详情: {error.message}</CardDescription>}
        </CardContent>
      </Card>
    </div>
  );
}