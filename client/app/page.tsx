"use client";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Briefcase, Mic, ArrowRight, Search, Users, Zap, Shield } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Search,
    title: "Find Work",
    description:
      "Browse open roles across industries. Filter by type, location, salary, and skills to find positions that match you.",
    href: "/findwork",
    cta: "Browse jobs",
  },
  {
    icon: Briefcase,
    title: "Post a Job",
    description:
      "List a role and reach candidates directly. Add skills, tags, location, and salary to attract the right applicants.",
    href: "/post",
    cta: "Post a role",
  },
  {
    icon: Mic,
    title: "Interview Prep",
    description:
      "Practice with AI-generated mock interviews tailored to the role. Record your answers and get instant feedback.",
    href: "/interview",
    cta: "Start preparing",
  },
];

const stats = [
  { label: "Open Roles", value: "2,400+" },
  { label: "Companies Hiring", value: "180+" },
  { label: "Interviews Completed", value: "12,000+" },
  { label: "Candidates Placed", value: "3,500+" },
];

const perks = [
  { icon: Zap, title: "Fast & Simple", desc: "Apply to jobs in seconds. No lengthy forms or unnecessary steps." },
  { icon: Users, title: "Built for People", desc: "Designed for both job seekers and employers to get results fast." },
  { icon: Shield, title: "Safe & Trusted", desc: "Every listing is reviewed. Your data stays private and secure." },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Demo Application
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
              The job platform<br />
              <span className="text-cyan-400">built for modern</span> hiring.
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              Browse open roles, post positions, and prepare for interviews —
              all in one place. HirePro keeps hiring simple and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/findwork"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-6 py-3 text-sm font-semibold text-white transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/30"
              >
                Browse open roles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/interview"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                Try Interview Prep
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From finding your next role to landing the interview, HirePro has you covered every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, href, cta }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-border p-7 flex flex-col gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
                <Link
                  href={href}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HirePro */}
      <section className="bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-bold text-foreground mb-10 text-center">Why HirePro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Ready to explore HirePro?
            </h2>
            <p className="text-sm text-slate-400">
              Browse jobs, post roles, or practice for your next interview.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/findwork"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-white transition-all"
            >
              Find work
            </Link>
            <Link
              href="/post"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              Post a job
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
