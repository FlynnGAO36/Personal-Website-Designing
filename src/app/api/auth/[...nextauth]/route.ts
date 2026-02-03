import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // 1. 配置登录提供商
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // 2. 回调函数：权限控制的核心
  callbacks: {
    async signIn({ user }: { user: any }) {
      // 检查登录邮箱是否等于你 .env 里的 ADMIN_EMAIL
      const isAdmin = user.email === process.env.ADMIN_EMAIL;
      
      if (isAdmin) {
        return true; // 允许登录
      } else {
        return false; // 拒绝登录，会跳转到错误页
      }
    },
  },

  // 3. 【关键修改点】：注释掉自定义页面配置
  // 这样 NextAuth 就会使用默认的 UI，不再报 404
  /*
  pages: {
    signIn: '/auth/signin', 
    error: '/auth/error',   
  },
  */
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };