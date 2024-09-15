import { SessionProvider, useSession } from "next-auth/react";
import HomeSession from "@/components/HomeSession";
import HomeServer from "@/components/HomeServer";

export default function Home() {
  return (
    // <SessionProvider>
    //   <HomeSession />
    // </SessionProvider>
    <HomeServer />
  );
}
