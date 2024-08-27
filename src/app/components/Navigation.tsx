import Link from "next/link";

const navItems = [
  { name: "SELF-INTRODUCTION", path: "/" },
  { name: "SKILLS", path: "/skills" },
  { name: "PRODUCTS", path: "/products" },
  { name: "CONTACT", path: "/contact" },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="flex justify-center gap-8 inter">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
