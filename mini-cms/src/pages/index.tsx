import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/articles', fetcher);

  if (error) return <div>Error loading articles.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Publikované články</h1>
      <ul>
        {data.map((article: any) => (
          <li key={article.id}>
            <a href={`/articles/${article.id}`}>{article.title}</a> by {article.author.name || article.author.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
