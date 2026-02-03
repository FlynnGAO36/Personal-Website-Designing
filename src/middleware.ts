import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 逻辑：如果已经通过了 withAuth 的校验，说明已登录
    // 你可以在这里进一步做重定向逻辑
    return NextResponse.next();
  },
  {
    callbacks: {
      // 只有返回 true 才会允许访问匹配的路由
      authorized: ({ token, req }) => {
        // 如果 token 存在且邮箱是管理员邮箱，则授权通过
        return token?.email === process.env.ADMIN_EMAIL;
      },
    },
  }
);

// 重点：设置匹配路径，只锁定以 /admin 开头的路由
export const config = { 
  matcher: ["/admin/:path*"] 
};