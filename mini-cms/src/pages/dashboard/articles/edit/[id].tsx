import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
          setTitle(data.title);
          setContent(data.content);
          setPublished(data.published);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, published }),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editace článku</h1>
      <label>
        Název:{" "}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Obsah:{" "}
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <br />
      <label>
        Publikovat:{" "}
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Uložit změny</button>
    </form>
  );
}
