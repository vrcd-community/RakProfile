import SignIn from "@/components/Logto/SignIn";
import { getLogtoContext, signIn } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";

export default async function Home() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">VRCD</h1>
      <h2 className="text-2xl font-semibold mb-8">虚拟现实中文开发者社区</h2>
      <div className="flex flex-col gap-4">
        {
          !isAuthenticated &&
          <SignIn
            onSignIn={async () => {
              'use server';

              await signIn(logtoConfig);
            }}
          />
        }
      </div>
    </div>
  );
}
