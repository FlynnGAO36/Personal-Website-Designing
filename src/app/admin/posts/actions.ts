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
  try {
    // 1. 执行数据库删除操作
    await prisma.post.delete({
      where: { id },
    });

    // 2. 核心步骤：清除缓存，确保用户看到的列表是最新的
    revalidatePath("/blog");
    revalidatePath("/admin/posts");

    // 3. 返回成功标志，让前端组件可以做后续处理（如关闭 loading）
    return { success: true };
  } catch (error) {
    // 4. 如果删除失败（比如数据库连接断开），在后台打印错误，并告知前端
    console.error("Delete Action Error:", error);
    return { success: false, error: "删除失败，请稍后再试" };
  }
}

/**
 * 更新文章
 */
export async function updatePost(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        category,
        content,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/posts");
    
    // 更新完后跳回列表页
    redirect("/admin/posts");
  } catch (error) {
    console.error("Update Action Error:", error);
    return { success: false, error: "更新失败" };
  }
}