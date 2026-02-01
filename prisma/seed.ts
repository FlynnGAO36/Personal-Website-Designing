import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始填充数据...')

  const posts = [
    {
      id: '1',
      title: '墨尔本最好吃的炸鱼薯条店清单',
      slug: 'best-fish-and-chips-melbourne',
      excerpt: '经过亲身实测，这几家店的薯条外酥里嫩，鱼肉鲜美。',
      content: '这里是详细的测评内容... 比如位于 St Kilda 的那家百年老店...',
      category: 'Food',
      published: true,
    },
    {
      id: '2',
      title: '墨尔本 Myki 查票员出没规律总结',
      slug: 'myki-inspector-rules',
      excerpt: '为了避免不必要的罚款，了解查票员的常见出没时间和地点非常重要。',
      content: '根据网友反馈，在市中心 Free Tram Zone 的边缘地带经常有小分队...',
      category: 'Life',
      published: true,
    }
  ]

  for (const post of posts) {
    const upsertedPost = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {}, // 如果已存在则不更新
      create: post,
    })
    console.log(`已创建/跳过文章: ${upsertedPost.title}`)
  }

  console.log('数据填充完成！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })