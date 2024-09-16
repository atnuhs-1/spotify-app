export { auth as middleware } from "@/auth";

// import { NextRequest, NextResponse } from "next/server";
// import authConfig from "./auth.config";
// import NextAuth from "next-auth";

// const {auth} = NextAuth(authConfig);
// export default auth(async function middleware(request: NextRequest){
//     console.log(
//         "middleware.ts: request.nextUrl.pathname",
//         request.nextUrl.pathname
//     );

//     return NextResponse.next();
// }) 

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
