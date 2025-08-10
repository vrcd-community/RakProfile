import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";

export const ErrorCard = ({ title, message }: { title: string; message: string }) => {
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle className="text-red-500 flex flex-row gap-1.5 mb-1">
          <AlertCircleIcon className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription className="text-red-500">{message}</CardDescription>
      </CardHeader>
    </Card>
  )
}