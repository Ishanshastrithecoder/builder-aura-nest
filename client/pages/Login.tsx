import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Login(){
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    toast({ title: "Signed in", description: `Welcome back, ${email}` });
  };

  return (
    <Layout>
      <section className="container py-16 max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-2 text-muted-foreground">Access your GreenSubsidy dashboard.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button className="w-full">Sign in</Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">No account? <a href="/register" className="text-primary underline-offset-4 hover:underline">Create one</a></p>
      </section>
    </Layout>
  );
}
