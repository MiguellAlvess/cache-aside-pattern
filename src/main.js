import express from "express"
import redisClient from "./config/redis"

const app = express()

app.get("/", async (req, res) => {
  const cacheKey = "featured-categories"
  const cachedCategories = await redisClient.get(cacheKey)
  if (cachedCategories) {
    return res.json(JSON.parse(cachedCategories))
  }

  const featuredCategories = await prisma.category.findMany({
    where: {
      isFeatured: true,
    },
  })

  await redisClient.setEx(cacheKey, 20, JSON.stringify(featuredCategories))

  res.json(featuredCategories)
})

app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})
