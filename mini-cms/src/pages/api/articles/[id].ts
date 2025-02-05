import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const articleId = parseInt(req.query.id as string);

  if (req.method === "GET") {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true, tags: true, category: true },
    });
    return res.status(200).json(article);
  } else if (req.method === "PUT") {
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, content, published, categoryId, tagIds } = req.body;
    // Ověření, zda je přihlášený uživatel vlastníkem článku
    const existingArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (existingArticle?.authorId !== (session.user as any).id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        title,
        content,
        published,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags: tagIds ? { set: tagIds.map((id: number) => ({ id })) } : undefined,
      },
    });
    return res.status(200).json(article);
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const existingArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (existingArticle?.authorId !== (session.user as any).id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await prisma.article.delete({ where: { id: articleId } });
    return res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
