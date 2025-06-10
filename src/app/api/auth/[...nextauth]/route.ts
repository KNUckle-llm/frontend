// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
//
// // todo: oauth 등록하기
// const handler = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       // account와 profile 정보를 토큰에 추가
//       if (account) {
//         token.accessToken = account.access_token;
//         token.id = profile?.id || "";
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // 세션에 사용자 정보 추가
//       session.accessToken = token.accessToken as string;
//       session.user.id = token.id as string;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // 커스텀 로그인 페이지 (선택사항)
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
//
// // export { handler as GET, handler as POST };
