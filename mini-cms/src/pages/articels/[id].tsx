import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

export default function ArticlePage({ article }: { article: any }) {
  if (!article) return <div>Článek nenalezen</div>;
  return (
    <div>
      <h1>{article.title}</h1>
      <p>Autor: {article.author.name || article.author.email}</p>
      <div>{article.content}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.params?.id as string);
  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: true },
  });
  return { props: { article } };
};
