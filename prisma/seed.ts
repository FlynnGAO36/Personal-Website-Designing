import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始填充数据...')

  const posts = [
    {
      id: 'post_001', // 沿用你 SQL 里的 ID
      title: '墨大 COMP10001 选课指南',
      slug: 'unimelb-comp10001-guide',
      excerpt: '作为墨大 CS 的敲门砖，这门课到底在学什么？',
      content: '这里是关于 COMP10001 的详细内容：Python 基础、算法思维，以及如何拿到 H1。',
      category: 'Study Tips',
      published: true,
    },
    {
      id: 'post_002', // 沿用你 SQL 里的 ID
      title: '墨尔本 City 宝藏咖啡馆推荐',
      slug: 'melbourne-coffee-spots',
      excerpt: '除了 Seven Seeds，墨尔本还有哪些值得一去的咖啡店？',
      content: '墨尔本是咖啡之都。推荐 Brother Baba Budan 的天花板，以及 Industry Beans 的手冲。',
      category: 'Melbourne Life',
      published: true,
    },
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
      update: {
        // 如果数据已存在，确保内容是最新的
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        published: post.published,
      },
      create: post,
    })
    console.log(`已同步文章: ${upsertedPost.title}`)
  }

  console.log('所有 4 篇数据同步完成！')
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