import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const categories = [
  {
    name: "Eletrônicos",
    description: "Produtos eletrônicos e gadgets de última geração",
    imageUrl: "https://example.com/images",
    isFeatured: true,
  },
  {
    name: "Moda",
    description: "Roupas, acessórios e tendências da estação",
    imageUrl: "https://example.com/images",
    isFeatured: true,
  },
  {
    name: "Casa e Decoração",
    description: "Móveis, decoração e itens para o lar",
    imageUrl: "https://example.com/images",
    isFeatured: false,
  },
  {
    name: "Esportes",
    description: "Equipamentos esportivos e roupas para atividades físicas",
    imageUrl: "https://example.com/images",
    isFeatured: true,
  },
  {
    name: "Livros",
    description: "Livros de diversos gêneros e autores",
    imageUrl: "https://example.com/images",
    isFeatured: false,
  },
  {
    name: "Beleza",
    description: "Produtos de beleza e cuidados pessoais",
    imageUrl: "https://example.com/images",
    isFeatured: false,
  },
  {
    name: "Automotivo",
    description: "Acessórios e peças para veículos",
    imageUrl: "https://example.com/images",
    isFeatured: false,
  },
  {
    name: "Jogos",
    description: "Jogos de videogame, tabuleiro e acessórios",
    imageUrl: "https://example.com/images",
    isFeatured: true,
  },
  {
    name: "Saúde",
    description: "Produtos para saúde e bem-estar",
    imageUrl: "https://example.com/images",
    isFeatured: false,
  },
  {
    name: "Tecnologia",
    description: "Inovações tecnológicas e soluções digitais",
    imageUrl: "https://example.com/images",
    isFeatured: true,
  },
]

async function main() {
  await prisma.category.deleteMany()

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
