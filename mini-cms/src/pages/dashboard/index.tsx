import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, error } = useSWR(session ? '/api/articles?user=true' : null, fetcher);

  if (!session) return <div>Prosím, přihlašte se.</div>;
  if (error) return <div>Error loading your articles.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Odhlásit se</button>
      <br />
      <Link href="/dashboard/articles/new"><a>Nový článek</a></Link>
      <ul>
        {data.map((article: any) => (
          <li key={article.id}>
            {article.title} -{" "}
            <Link href={`/dashboard/articles/edit/${article.id}`}>
              <a>Edit</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
