import { signOut } from "@/auth";
import { Button } from "./ui/button";

export default function SignOut({provider, ...props}: {provider? : string} & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="ghost" className="w-full p-0" {...props}>Sign Out</Button>
    </form>
  );
}