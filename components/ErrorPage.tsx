import Link from "next/link";
import { Button } from "./ui/button";

export default function ErrorPage() {
  return (
    <div className="bg-slate-50 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-5">Home</h1>
        <div className="flex flex-col justify-center items-center gap-8">
          <h2 className="font-bold text-slate-600 text-2xl">サインインして</h2>
          <Button asChild>
            <Link href="api/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
