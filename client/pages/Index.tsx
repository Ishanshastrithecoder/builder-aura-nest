import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Badge({ children }: { children: React.ReactNode }){
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

type AuditEvent = {
  id: string;
  time: string;
  message: string;
};

function MilestoneVerifier() {
  const [productionKg, setProductionKg] = useState(0);
  const [stage, setStage] = useState("Electrolyser Commissioned");
  const [oracleOnline, setOracleOnline] = useState(true);
  const [kycOk, setKycOk] = useState(true);
  const [audit, setAudit] = useState<AuditEvent[]>([]);

  const eligibleTiers = useMemo(() => {
    const tiers = [
      { label: "Tier 1", threshold: 1000, rate: 0.5 },
      { label: "Tier 2", threshold: 5000, rate: 0.4 },
      { label: "Tier 3", threshold: 20000, rate: 0.3 },
    ];
    const achieved = tiers.filter(t => productionKg >= t.threshold);
    return { tiers, achieved };
  }, [productionKg]);

  const subsidy = useMemo(() => {
    // Simple stepped subsidy: sum of achieved tiers * rate per kg
    return eligibleTiers.achieved.reduce((sum, t) => sum + t.threshold * t.rate, 0);
  }, [eligibleTiers]);

  const canDisburse = oracleOnline && kycOk && (eligibleTiers.achieved.length > 0 || stage === "Project Completed");

  const log = (message: string) => {
    setAudit(a => [
      {
        id: Math.random().toString(36).slice(2),
        time: new Date().toLocaleString(),
        message,
      },
      ...a,
    ]);
  };

  const handleVerify = () => {
    if (!oracleOnline) return log("Verification failed: Oracle offline");
    if (!kycOk) return log("Verification failed: KYC/sanctions check not passed");
    if (canDisburse) {
      log(`Milestone verified: ${productionKg.toLocaleString()} kg, stage: ${stage}`);
      log(`Smart contract emitted Disburse(subsidy=${subsidy.toFixed(2)})`);
    } else {
      log("Milestone verification complete: No disbursement conditions met yet");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="text-lg font-semibold">Milestone Verification</h3>
        <p className="mt-1 text-sm text-muted-foreground">Simulated oracle-backed verification. Values remain client-only for demo.</p>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm font-medium">Hydrogen Produced (kg)</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={30000}
                step={100}
                value={productionKg}
                onChange={e => setProductionKg(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="w-28 text-right tabular-nums">{productionKg.toLocaleString()} kg</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Project Stage</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {["Electrolyser Commissioned","Pilot Production","Scaled Production","Project Completed"].map(s => (
                <button key={s} onClick={()=>setStage(s)} className={cn("rounded-md border px-3 py-2 text-sm", stage===s?"bg-primary text-primary-foreground border-transparent":"hover:bg-accent")}>{s}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={oracleOnline} onChange={e=>setOracleOnline(e.target.checked)} />
              Oracle Online
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={kycOk} onChange={e=>setKycOk(e.target.checked)} />
              KYC/AML Pass
            </label>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Disbursement</p>
                <p className="text-2xl font-bold">₹ {subsidy.toLocaleString(undefined,{maximumFractionDigits:2})}</p>
              </div>
              <Button onClick={handleVerify} className="bg-primary text-primary-foreground hover:bg-primary/90">Verify & Trigger</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Calculated from achieved tiers. Actual logic can match policy.</p>
          </div>

          <div>
            <label className="text-sm font-medium">Tiers</label>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {eligibleTiers.tiers.map(t => {
                const active = productionKg >= t.threshold;
                return (
                  <li key={t.label} className={cn("rounded-md border p-3 text-sm", active?"border-emerald-500 bg-emerald-500/10":"opacity-70")}> {t.label}: ≥{t.threshold.toLocaleString()} kg @ ₹{t.rate}/kg</li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="text-lg font-semibold">On-chain Audit Trail</h3>
        <p className="mt-1 text-sm text-muted-foreground">Every state change and disbursement is recorded immutably.</p>
        <div className="mt-4 h-[420px] overflow-auto rounded-lg border bg-background p-3">
          {audit.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No events yet. Run a verification to populate the log.</div>
          ) : (
            <ul className="space-y-3">
              {audit.map(e => (
                <li key={e.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{e.time}</span>
                    <Badge>event</Badge>
                  </div>
                  <p className="mt-1 text-sm">{e.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <div className="container py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Smart Contracts</Badge>
                <Badge>Real-time Oracles</Badge>
                <Badge>Audit Trails</Badge>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Green Hydrogen Subsidy Disbursement via Smart Contracts</h1>
              <p className="mt-4 text-lg text-muted-foreground">Automate government incentives with verifiable milestones like hydrogen volume or project stages. Integrate trusted data feeds and trigger secure payments instantly—transparent, auditable, and policy-compliant.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#how"><Button className="bg-primary text-primary-foreground hover:bg-primary/90">How it works</Button></a>
                <a href="#demo"><Button variant="outline">Try the demo</Button></a>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.25),transparent_40%)]" />
              <div className="rounded-2xl border bg-card p-6 shadow-xl shadow-emerald-500/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Chain</p>
                    <p className="font-semibold">Ethereum / Hyperledger</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Oracles</p>
                    <p className="font-semibold">Trusted data feeds</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Payments</p>
                    <p className="font-semibold">Banking rails</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">Compliance</p>
                    <p className="font-semibold">KYC/AML, audit logs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Programmable Subsidies</h3>
            <p className="mt-2 text-sm text-muted-foreground">Define milestones such as production volume or completion stages. Contracts release funds automatically when verified.</p>
          </div>
          <div className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Oracle-backed Verification</h3>
            <p className="mt-2 text-sm text-muted-foreground">Ingest real-time data from trusted sources to confirm outcomes with cryptographic integrity.</p>
          </div>
          <div className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Audit & Compliance</h3>
            <p className="mt-2 text-sm text-muted-foreground">Immutable logs, exportable reports, and seamless integration with legacy banking platforms.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50 to-white" />
        <div className="container py-16 md:py-24">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            <li className="rounded-2xl border p-6">
              <span className="text-sm font-semibold text-emerald-600">1. Define</span>
              <p className="mt-2 text-sm text-muted-foreground">Configure milestones and policy rules: thresholds, rates, and required attestations.</p>
            </li>
            <li className="rounded-2xl border p-6">
              <span className="text-sm font-semibold text-emerald-600">2. Verify</span>
              <p className="mt-2 text-sm text-muted-foreground">Oracles ingest production and stage data; smart contracts validate conditions.</p>
            </li>
            <li className="rounded-2xl border p-6">
              <span className="text-sm font-semibold text-emerald-600">3. Disburse</span>
              <p className="mt-2 text-sm text-muted-foreground">On success, payments are triggered to approved beneficiaries via banking APIs.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="container py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Real-time milestone verification demo</h2>
            <a href="#cta" className="text-sm text-primary">Get a tailored demo →</a>
          </div>
          <MilestoneVerifier />
        </div>
      </section>

      {/* Security & Integrations */}
      <section id="security" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-cyan-50 to-white" />
        <div className="container py-16 md:py-24">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Security & Compliance</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• Solidity smart contracts or Hyperledger chaincode with formalized rules</li>
                <li>• Secure backend (Node.js/Python) with least-privilege architecture</li>
                <li>• Signed oracle updates; defense-in-depth validation</li>
                <li>• KYC/AML checks; comprehensive audit trails</li>
                <li>• Database support (SQL/NoSQL) and scalable APIs</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">Integrations</h3>
              <p className="mt-1 text-sm text-muted-foreground">Works with legacy payment platforms and banking gateways.</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "NPCI / UPI",
                  "NEFT/RTGS",
                  "SWIFT",
                  "Bank APIs",
                  "Gov ERP",
                  "Data Oracles",
                ].map(i => (
                  <div key={i} className="rounded-lg border bg-card p-3 text-center text-xs font-medium">{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="container py-16 md:py-24">
        <div className="rounded-2xl border bg-gradient-to-br from-emerald-500 to-cyan-600 p-8 text-white">
          <h2 className="text-2xl font-bold tracking-tight">Ready to modernize green hydrogen subsidies?</h2>
          <p className="mt-2 max-w-2xl text-white/90">Book a session and well tailor the contract logic and integrations to your policy—secure, transparent, and production-ready.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/dashboard"><Button variant="secondary" className="text-emerald-950">Explore dashboard</Button></a>
            <a href="#" onClick={(e)=>e.preventDefault()}><Button variant="outline" className="border-white/40 text-white hover:bg-white/10">Contact sales</Button></a>
          </div>
        </div>
      </section>
    </div>
  );
}
