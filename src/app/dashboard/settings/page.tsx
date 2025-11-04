
"use client";

import { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Scale, FileText, BrainCircuit, RefreshCw, ChevronDown, Loader2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatePresence, motion } from "framer-motion";
import { GovernanceContext } from "@/context/governance-context";
import { toast } from "@/hooks/use-toast";

const checks = [
  { id: "integrity", name: "Data Integrity Scan", icon: FileText, duration: 1500 },
  { id: "compliance", name: "Compliance Check (SOC2, GDPR)", icon: ShieldCheck, duration: 2000 },
  { id: "bias", name: "AI Bias & Fairness Scan", icon: Scale, duration: 2500 },
  { id: "security", name: "Security Audit Simulation", icon: BrainCircuit, duration: 1800 },
];

const insights = [
  "Encrypt personally identifiable fields before storage.",
  "Schema deviation found in 'transaction_log' table — suggest normalization.",
  "Data bias risk: overrepresentation detected in Region A.",
  "Access control policy for 'Editor' role can be tightened for production data."
];

export default function GovernancePage() {
  const [running, setRunning] = useState(false);
  const [completedChecks, setCompletedChecks] = useState<string[]>([]);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [generatedInsights, setGeneratedInsights] = useState<string[]>([]);
  const [runId, setRunId] = useState(0);
  const { addGovernanceReport } = useContext(GovernanceContext);

  const startValidation = () => {
    setRunning(true);
    setCompletedChecks([]);
    setConfidenceScore(0);
    setGeneratedInsights([]);
    setRunId(prev => prev + 1);

    let cumulativeDelay = 0;
    checks.forEach((check, index) => {
      cumulativeDelay += check.duration;
      setTimeout(() => {
        setCompletedChecks(prev => [...prev, check.id]);
        setConfidenceScore(Math.round(((index + 1) / checks.length) * 98));
      }, cumulativeDelay - (check.duration / 2));
    });

    setTimeout(() => {
        setRunning(false);
        let insightDelay = 0;
        insights.forEach(insight => {
            insightDelay += 500;
            setTimeout(() => setGeneratedInsights(prev => [...prev, insight]), insightDelay);
        });

        const finalScore = 98;
        const newReport = {
            id: `gov-${Date.now()}`,
            scanType: "Full System Audit",
            confidenceScore: finalScore,
            issuesFound: 2,
            scannedAt: "Just now",
            status: "Compliant" as "Compliant" | "At Risk",
        };
        addGovernanceReport(newReport);
        toast({
            title: "Governance Scan Complete",
            description: `A new report has been added to Recent Governance Reports.`,
        });

    }, cumulativeDelay);
  };
  
  useEffect(() => {
    startValidation();
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-3">
             <span className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <ShieldCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
            </span>
            watsonx.governance Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Trust. Transparency. Compliance. Real-time governance for your AI workflows.
          </p>
        </div>
        <Button onClick={startValidation} disabled={running}>
            {running ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <RefreshCw className="mr-2 h-4 w-4" />}
          Re-run Validation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Automated Governance Flow</CardTitle>
            <CardDescription>Simulating real-time policy and compliance validation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
                {checks.map((check) => {
                    const isRunning = running && !completedChecks.includes(check.id) && (completedChecks.length === 0 || checks.findIndex(c => c.id === completedChecks[completedChecks.length - 1]) < checks.findIndex(c => c.id === check.id));
                    const isCompleted = completedChecks.includes(check.id);
                    
                    return (
                        <motion.div 
                            key={`${runId}-${check.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: checks.findIndex(c => c.id === check.id) * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                        >
                            <div className={`p-2 rounded-full ${isCompleted ? "bg-green-500/20" : isRunning ? "bg-primary/20 animate-pulse" : "bg-muted"}`}>
                                <check.icon className={`h-6 w-6 ${isCompleted ? "text-green-500" : isRunning ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{check.name}</p>
                                <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
                                     {isRunning && <motion.div className="h-full bg-primary rounded-full" initial={{width: "0%"}} animate={{width: "100%"}} transition={{duration: check.duration / 1000, ease: "linear"}} />}
                                     {isCompleted && <div className="h-full w-full bg-green-500 rounded-full" />}
                                </div>
                            </div>
                            <AnimatePresence mode="wait">
                               {isCompleted ? (
                                    <motion.div key="completed" initial={{scale:0}} animate={{scale:1}}>
                                        <CheckCircle className="h-6 w-6 text-green-500" />
                                    </motion.div>
                               ) : isRunning ? (
                                    <motion.div key="running" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                                        <Loader2 className="h-6 w-6 text-primary animate-spin"/>
                                    </motion.div>
                               ) : (
                                    <div className="h-6 w-6" />
                               )}
                           </AnimatePresence>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card className="text-center shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Governance Confidence Score</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="relative w-40 h-40 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle className="text-border" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50"/>
                            <motion.circle 
                                className="text-primary"
                                strokeWidth="8" 
                                strokeLinecap="round"
                                stroke="currentColor" 
                                fill="transparent" 
                                r="42" 
                                cx="50" 
                                cy="50"
                                initial={{ strokeDashoffset: 264 }}
                                animate={{ strokeDashoffset: 264 - (confidenceScore/100) * 264 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ strokeDasharray: 264, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                            />
                        </svg>
                        <motion.div initial={{opacity: 0}} animate={{opacity:1}} className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                            {confidenceScore}%
                        </motion.div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        {running ? "Analysis in progress..." : (confidenceScore > 95 ? "All policies aligned." : "Minor schema drift detected.")}
                    </p>
                </CardContent>
            </Card>

            <Collapsible defaultOpen={true}>
                 <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                    <CollapsibleTrigger className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Governance Insights
                                <ChevronDown className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:-rotate-180" />
                            </CardTitle>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent className="space-y-3 pt-0">
                           {generatedInsights.length === 0 && !running && <p className="text-sm text-center text-muted-foreground p-4">No new insights. System is fully compliant.</p>}
                           {running && generatedInsights.length === 0 && <p className="text-sm text-center text-muted-foreground p-4">Generating insights...</p>}
                           <AnimatePresence>
                             {generatedInsights.map((insight, index) => (
                                 <motion.div 
                                    key={index}
                                    initial={{opacity: 0, x: -10}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: index * 0.2}}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/50"
                                >
                                    <BrainCircuit className="h-5 w-5 text-indigo-500 mt-0.5" />
                                    <p className="text-sm text-indigo-700 dark:text-indigo-300">{insight}</p>
                                 </motion.div>
                             ))}
                           </AnimatePresence>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        </div>
      </div>
       <div className="absolute bottom-4 right-6 text-xs text-muted-foreground opacity-50 font-medium">
            IBM watsonx.governance in action
        </div>
    </div>
  );
}
