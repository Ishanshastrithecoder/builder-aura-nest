import Layout from "@/components/Layout";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export default function Settings(){
  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Settings saved", description: "Your preferences were updated." });
  };

  return (
    <Layout>
      <section className="container py-16 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your profile and application preferences.</p>

        <form onSubmit={onSave} className="mt-8 space-y-8">
          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Profile</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" placeholder="Ishan Shastri" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email updates</Label>
                  <p className="text-sm text-muted-foreground">Subsidy status and audit events</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Security alerts</Label>
                  <p className="text-sm text-muted-foreground">Unusual access or policy changes</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Security</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="password">New password</Label>
                <Input id="password" name="password" type="password" />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" name="confirm" type="password" />
              </div>
              <div className="sm:col-span-3">
                <Button>Update password</Button>
              </div>
            </div>
          </div>

          <Separator />
          <div className="flex justify-end">
            <Button type="submit" className="px-6">Save changes</Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
