import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-md shadow-emerald-500/30">
        GH
      </span>
      <span className="font-extrabold tracking-tight text-foreground">GreenSubsidy</span>
    </Link>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
      scrolled ? "border-border" : "border-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden gap-6 md:flex">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground">How it works</a>
          <a href="#security" className="text-sm text-muted-foreground hover:text-foreground">Security</a>
          <NavLink to="/dashboard" className={({isActive})=>cn("text-sm", isActive?"text-foreground":"text-muted-foreground hover:text-foreground")}>Dashboard</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <NavLink to="/login" className={({isActive})=>cn("hidden md:inline text-sm px-2 py-1 rounded-md", isActive?"text-foreground":"text-muted-foreground hover:text-foreground")}>Login</NavLink>
          <NavLink to="/register" className={({isActive})=>cn("hidden md:inline text-sm px-2 py-1 rounded-md", isActive?"text-foreground":"text-muted-foreground hover:text-foreground")}>Register</NavLink>
          <NavLink to="/settings" className={({isActive})=>cn("hidden md:inline text-sm px-2 py-1 rounded-md", isActive?"text-foreground":"text-muted-foreground hover:text-foreground")}>Settings</NavLink>
          <a href="#cta" className="hidden md:inline-flex">
            <Button variant="ghost">Request demo</Button>
          </a>
          <NavLink to="/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Launch App</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

function Footer(){
  return (
    <footer className="border-t">
      <div className="container py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GreenSubsidy. Secure, transparent subsidy disbursement for green hydrogen.</p>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }){
  const location = useLocation();
  useEffect(()=>{ window.scrollTo(0,0); },[location.pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
