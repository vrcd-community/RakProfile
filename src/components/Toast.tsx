"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function Toast() {
    const { resolvedTheme } = useTheme();

    return <Toaster theme={resolvedTheme as any} />
}
