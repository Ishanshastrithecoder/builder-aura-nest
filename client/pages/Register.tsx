import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Register(){
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const org = String(form.get("org") || "");
    toast({ title: "Account created", description: `Organization: ${org}` });
  };

  return (
    <Layout>
      <section className="container py-16 max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
        <p className="mt-2 text-muted-foreground">Get started with automated green hydrogen subsidies.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required placeholder="Ishan Shastri" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org">Organization</Label>
            <Input id="org" name="org" required placeholder="Acme Hydrogen" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button className="w-full">Create account</Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">Have an account? <a href="/login" className="text-primary underline-offset-4 hover:underline">Sign in</a></p>
      </section>
    </Layout>
  );
}
