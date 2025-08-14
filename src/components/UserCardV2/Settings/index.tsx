import {
  Card
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import MFA from "./MFA"
import SocialIdentity from "./SocialIdentity"

export const Settings = () => {
  return (
    <Card className="w-full px-6 py-8">
      <Tabs defaultValue="mfa">
        <TabsList>
          <TabsTrigger value="mfa">多因素认证</TabsTrigger>
          <TabsTrigger value="social-identity">第三方账号</TabsTrigger>
        </TabsList>
        <div className="ml-1">
          <TabsContent value="mfa">
            <MFA />
          </TabsContent>
          <TabsContent value="social-identity">
            <SocialIdentity />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  )
}