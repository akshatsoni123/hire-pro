import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">HirePro</span>
        <div className="flex items-center gap-4">
          <Link href="/findwork" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Find Work</Link>
          <Link href="/post" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Post a Job</Link>
          <Link href="/interview" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Interview Prep</Link>
          <Link href="/review" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Reviews</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} HirePro
        </p>
      </div>
    </footer>
  );
};

export default Footer;