import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">VRCD</h1>
      <h2 className="text-2xl font-semibold mb-8">虚拟现实中文开发者社区</h2>
      <div className="flex space-x-4">
        <Button variant="outline" className="w-32 hover:scale-110 active:zoom-in-90 transition-transform duration-200">登录</Button>
        <Button variant="outline" className="w-32 hover:scale-110 active:zoom-in-90 transition-transform duration-200">注册</Button>
      </div>
    </div>
  );
}
