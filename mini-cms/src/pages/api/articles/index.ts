import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    // Pokud je v query parametr "user", vrátíme články přihlášeného uživatele
    if (req.query.user && session) {
      const articles = await prisma.article.findMany({
        where: { authorId: (session.user as any).id },
        include: { author: true, tags: true, category: true },
      });
      return res.status(200).json(articles);
    }
    // Veřejná část – pouze publikované články
    const articles = await prisma.article.findMany({
      where: { published: true },
      include: { author: true, tags: true, category: true },
    });
    return res.status(200).json(articles);
  } else if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, content, published, categoryId, tagIds } = req.body;
    const article = await prisma.article.create({
      data: {
        title,
        content,
        published: published || false,
        author: { connect: { id: (session.user as any).id } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags: tagIds ? { connect: tagIds.map((id: number) => ({ id })) } : undefined,
      },
    });
    return res.status(201).json(article);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
