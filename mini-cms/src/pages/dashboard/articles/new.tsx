import { useState } from "react";
import { useRouter } from "next/router";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, published }),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nový článek</h1>
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
      <button type="submit">Vytvořit</button>
    </form>
  );
}
