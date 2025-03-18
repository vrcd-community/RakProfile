'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOut = ({ onSignOut }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      variant="outline"
      className="w-32 hover:scale-110 active:scale-90 transition-transform duration-200"
      onClick={() => {
        setLoading(true);
        onSignOut();
      }}
    >
      {
        loading ? (
          <>
            <Loader2 className="animate-spin" />
            加载中...
          </>
        ) : (
          "退出登录"
        )
      }
    </Button>
  );
};

export default SignOut;