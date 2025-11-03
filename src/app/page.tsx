import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="relative rounded-full p-4 bg-card/80 backdrop-blur-sm border border-primary/20">
                <BrainCircuit className="h-16 w-16 text-primary" />
            </div>
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-accent">
            OmniMind Orchestrator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Automate, Orchestrate, and Innovate with AI-Powered Workflows. Visually design, simulate, and monitor complex processes with the power of simulated IBM watsonx.
          </p>
        </div>

        <Link href="/dashboard">
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
            Go to Dashboard
          </Button>
        </Link>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>A demo-ready platform simulating AI workflow automation.</p>
      </footer>
    </main>
  );
}
