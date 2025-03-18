import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
  };
  id: string;
}

export function UserProfile({ user, id }: UserProfileProps) {
  return (
    <>
      <CardHeader className="flex flex-col md:flex-row items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar} alt="User avatar" />
          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.name}</CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-6">
        <div>
          <CardTitle className="text-lg">用户信息</CardTitle>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <div>
              <CardDescription>
                用户ID: {id}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}