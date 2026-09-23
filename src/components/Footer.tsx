export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center">
      <p className="text-xs text-fg-faint">
        © {new Date().getFullYear()} Eleni Tadese. Built with Next.js,
        TypeScript &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
