import Layout from "@/components/Layout";

export default function Dashboard(){
  return (
    <Layout>
      <section className="container py-16">
        <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">This area will host authenticated project views, live oracle feeds, subsidy ledgers, and audit trails. Ask to flesh this out when youre ready.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold">Milestones</h3>
            <p className="text-sm text-muted-foreground mt-1">Connect oracles to start verifying production and completion stages.</p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold">Subsidy Ledger</h3>
            <p className="text-sm text-muted-foreground mt-1">Track disbursements and pending approvals in real time.</p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold">Compliance</h3>
            <p className="text-sm text-muted-foreground mt-1">All activity is logged for audit. Export reports anytime.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
