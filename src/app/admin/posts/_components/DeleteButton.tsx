"use client"; // 声明为客户端组件

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePost } from "../actions"; // 引入你刚刚写的 action
import { useState } from "react";

export function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // 增加一个原生的确认弹窗（精修时可以换成 Shadcn 的 Dialog）
    if (!confirm("确定要删除这篇文章吗？此操作不可撤销。")) return;

    setIsDeleting(true);
    try {
      await deletePost(id);
    } catch (error) {
      alert("删除时出错");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className={`h-4 w-4 ${isDeleting ? "animate-pulse" : ""}`} />
    </Button>
  );
}