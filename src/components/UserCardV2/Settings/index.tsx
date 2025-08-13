import {
  Card,
  CardContent
} from "@/components/ui/card"
import MFA from "./MFA"

export const Settings = () => {
  return (
    <Card className="w-full px-6 py-8">
      <MFA />
    </Card>
  )
}