import { Loader2Icon } from "lucide-react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

const LoadingContent = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-row items-center justify-center h-full">
      <Loader2Icon className="w-6 h-6 animate-spin" />
      <p className="text-center ml-2 font-semibold">{text}</p>
    </div>
  )
}

export const Loading = ({ text, card }: { text?: string; card?: boolean }) => {
  text = text || "Loading...";
  card = card || false;

  if (card) {
    return (
      <Card>
        <CardContent>
          <div className="my-4">
            <LoadingContent text={text} />
          </div>
        </CardContent>
      </Card>
    )
  }

  return <LoadingContent text={text} />
}