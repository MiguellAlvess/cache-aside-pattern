import express from "express"

const app = express()

app.get("/", async (req, res) => {
  const cacheKey = "featured-categories"
  const featuredCategories = await prisma.category.findMany({
    where: {
      isFeatured: true,
    },
  })

  res.json(featuredCategories)
})

app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})
