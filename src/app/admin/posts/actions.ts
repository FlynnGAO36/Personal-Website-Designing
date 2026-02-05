"use server" // 告诉 Next.js 这是一个只能在服务器运行的函数

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 创建新文章
 * @param formData 从原生 HTML 表单传来的数据
 */
export async function createPost(formData: FormData) {
  // 1. 获取表单字段 (注意: 这里的 get("xxx") 必须对应后面表单 Input 的 name 属性)
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;

  // 2. 写入数据库
  // 因为我们在 Schema 里写了 @default(cuid())，所以这里不需要手动写 id
  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      category,
      content,
      published: true, // 默认直接发布
    },
  });

  // 3. 核心步骤：清除缓存
  // 告诉 Next.js 之前的博客列表页和管理页数据旧了，需要重新抓取
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  
  // 4. 跳转回管理列表页
  redirect("/admin/posts");
}

/**
 * 删除文章
 * @param id 文章的唯一 ID
 */
export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id },
  });

  // 同样需要刷新路径，否则用户看到的列表里文章还没消失
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}