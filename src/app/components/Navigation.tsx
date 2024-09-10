import Link from "next/link";

const navItems = [
  { id: "01", nameJP: "自己紹介", name: "SELF-INTRODUCTION", path: "/" },
  { id: "02", nameJP: "スキル", name: "SKILLS", path: "/skills" },
  { id: "03", nameJP: "プロジェクト", name: "PRODUCTS", path: "/products" },
  { id: "04", nameJP: "お問い合わせ", name: "CONTACT", path: "/contact" },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="flex justify-center gap-8 inter">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <span>{item.id}</span>
              <div>{item.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
