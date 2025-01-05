import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();

  const isCurrentPath = (path: string) => pathname === path;

  const navLinks = [
    { href: "/product", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative py-2 text-base font-medium transition-colors ${
              isCurrentPath(link.href)
                ? "text-green-600"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            {link.label}
            {isCurrentPath(link.href) && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <div className="py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 mb-2 rounded-lg transition-all ${
                isCurrentPath(link.href)
                  ? "bg-green-50 text-green-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg">{link.label}</span>
                {isCurrentPath(link.href) && (
                  <span className="ml-2 w-1.5 h-1.5 bg-green-600 rounded-full" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
