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
            <Link
              className="after:content-[''] after:block after:h-[1px] after:bg-foreground after:max-w-0 after:hover:max-w-full after:transition-all after:duration-300 after:ease-[cubic-bezier(0.785, 0.135, 0.15, 0.86)]"
              href={item.path}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
