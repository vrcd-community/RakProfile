'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, User2 } from "lucide-react";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      variant="ghost"
      className="h-8 hover:scale-110 active:scale-90 transition-transform duration-200"
      onClick={() => {
        setLoading(true);
        onSignIn();
      }}
    >
      {
        loading ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            <User2 />
            登录
          </>
        )
      }
    </Button>
  );
};

export default SignIn;