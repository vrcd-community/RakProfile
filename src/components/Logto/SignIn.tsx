'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      variant="outline"
      className="w-32 hover:scale-110 active:scale-90 transition-transform duration-200"
      onClick={() => {
        setLoading(true);
        onSignIn();
      }}
    >
      {
        loading ? (
          <>
            <Loader2 className="animate-spin" />
            加载中...
          </>
        ) : (
          "登录"
        )
      }
    </Button>
  );
};

export default SignIn;