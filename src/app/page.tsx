import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/hoverscrolleffect-7lZnjZqykGq9x88UUGFH4Ejl/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        ></iframe>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-accent">
            OmniMind Orchestrator
          </h1>
          <p className="text-lg md:text-xl text-foreground/80">
            Automate, Orchestrate, and Innovate with AI-Powered Workflows. Visually design, simulate, and monitor complex processes with the power of simulated IBM watsonx.
          </p>
        </div>

        <Link href="/dashboard">
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
            Go to Dashboard
          </Button>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-center text-sm text-foreground/60 z-10">
        <p>A demo-ready platform simulating AI workflow automation.</p>
      </footer>
    </main>
  );
}
