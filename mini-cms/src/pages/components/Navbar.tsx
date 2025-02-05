// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0 }}>
        <li>
          <Link href="/">Domů</Link>
        </li>
        <li>
          <Link href="/login">Přihlášení</Link>
        </li>
        <li>
          <Link href="/register">Registrace</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
