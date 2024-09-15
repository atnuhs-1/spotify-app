import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function SignIn({provider, ...props}: {provider? : string} & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}
