
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, Database, Cloud, FileCode, CheckCircle, Loader2, BarChart, PieChart, LineChart, Cpu, Search, AlertTriangle, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { Bar, Cell, BarChart as RechartsBarChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from "recharts"


const initialProfilingSteps = [
    { id: "schema", text: "Analyzing Schema...", icon: Search, status: "pending" },
    { id: "quality", text: "Assessing Data Quality...", icon: Cpu, status: "pending" },
    { id: "anomalies", text: "Detecting Anomalies...", icon: AlertTriangle, status: "pending" },
    { id: "insights", text: "Generating AI Insights...", icon: Wand2, status: "pending" },
];

const initialChartData = [
    { name: 'Customer ID', completeness: 100, type: 'string' },
    { name: 'Purchase Date', completeness: 100, type: 'date' },
    { name: 'Product Name', completeness: 98, type: 'string' },
    { name: 'Quantity', completeness: 100, type: 'number' },
    { name: 'Unit Price', completeness: 100, type: 'number' },
    { name: 'Customer Age', completeness: 95, type: 'number' },
    { name: 'Region', completeness: 92, type: 'string' },
    { name: 'Spending Score', completeness: 88, type: 'number' },
]

const aiInsights = [
    "Customer Age column has 5% missing values—recommend imputation.",
    "Detected strong correlation between Income and Spending Score.",
    "Possible schema drift: Transaction_ID datatype changed from int → string.",
    "Region data is skewed towards 'North America'. Consider rebalancing for model training."
];

export default function DataSourcesPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isProfiling, setIsProfiling] = useState(false);
    const [profilingSteps, setProfilingSteps] = useState(initialProfilingSteps);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    
    const startUpload = () => {
        setIsUploading(true);
        setAnalysisComplete(false);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    startProfiling();
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const startProfiling = () => {
        setIsProfiling(true);
        setProfilingSteps(initialProfilingSteps.map(s => ({...s, status: 'pending'})));
        
        let stepIndex = 0;
        const stepInterval = setInterval(() => {
            if(stepIndex >= profilingSteps.length) {
                clearInterval(stepInterval);
                setIsProfiling(false);
                setAnalysisComplete(true);
                return;
            }

            setProfilingSteps(prev => prev.map((step, index) => {
                if (index < stepIndex) return { ...step, status: "complete" };
                if (index === stepIndex) return { ...step, status: "running" };
                return step;
            }));
            
            setTimeout(() => {
                setProfilingSteps(prev => prev.map((step, index) => index === stepIndex ? { ...step, status: "complete" } : step));
                stepIndex++;
            }, 800)


        }, 1000);
    };

    const dataTypes = initialChartData.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(dataTypes).map(([name, value]) => ({ name, value, fill: name === 'string' ? '#0F62FE' : name === 'number' ? '#08BDBA' : '#A3BFD9' }));
    
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-3">
                    <span className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <Database className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </span>
                    watsonx.data Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                    Ingest, profile, and visualize data quality with AI-powered insights.
                </p>
                </div>
                <Button onClick={startUpload} disabled={isUploading || isProfiling}>
                    Re-analyze Data
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Panel: Upload & Sources */}
                <Card className="lg:col-span-1 shadow-lg">
                    <CardHeader>
                        <CardTitle>Data Ingestion</CardTitle>
                        <CardDescription>Connect or upload your data source.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer" onClick={startUpload}>
                            <UploadCloud className="h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 font-semibold">Drag & Drop or Click to Upload</p>
                            <p className="text-xs text-muted-foreground mt-1">CSV, JSON, or Excel</p>
                        </div>

                         {isUploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <p className="font-medium">Uploading sales_data.csv...</p>
                                    <p className="font-bold">{uploadProgress}%</p>
                                </div>
                                <Progress value={uploadProgress} className="h-2"/>
                            </div>
                        )}

                        <div className="flex justify-around pt-4">
                            <Button variant="ghost" className="flex-col h-auto">
                                <Cloud className="h-6 w-6 text-primary"/>
                                <span className="mt-1 text-xs">Connect Cloud</span>
                            </Button>
                             <Button variant="ghost" className="flex-col h-auto">
                                <Database className="h-6 w-6 text-primary"/>
                                <span className="mt-1 text-xs">From Database</span>
                            </Button>
                             <Button variant="ghost" className="flex-col h-auto">
                                <FileCode className="h-6 w-6 text-primary"/>
                                <span className="mt-1 text-xs">From API</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Panel: Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                    {(isProfiling || analysisComplete) && (
                        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>AI-Powered Data Profiling</CardTitle>
                                <CardDescription>Analyzing data with watsonx.data...</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {profilingSteps.map(step => (
                                    <div key={step.id} className="flex items-center gap-4">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            {step.status === 'pending' && <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />}
                                            {step.status === 'running' && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                                            {step.status === 'complete' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                        </div>
                                        <step.icon className={`h-5 w-5 ${step.status === 'running' ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <p className={`font-medium ${step.status === 'running' ? 'text-primary' : 'text-card-foreground'}`}>{step.text}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    <AnimatePresence>
                    {analysisComplete && (
                        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                             <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>Analysis & Visual Insights</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                       <h3 className="font-semibold">Data Completeness</h3>
                                       <ChartContainer config={{}} className="h-48">
                                            <RechartsBarChart data={initialChartData} layout="vertical" margin={{ left: 20 }}>
                                                <RechartsBarChart.Tooltip content={<ChartTooltipContent hideLabel />} />
                                                <Bar dataKey="completeness" fill="#0F62FE" radius={[0, 4, 4, 0]} />
                                            </RechartsBarChart>
                                        </ChartContainer>
                                   </div>
                                    <div className="space-y-4">
                                       <h3 className="font-semibold">Data Type Distribution</h3>
                                       <ChartContainer config={{}} className="h-48">
                                            <RechartsPieChart>
                                                <RechartsPieChart.Tooltip content={<ChartTooltipContent hideLabel />} />
                                                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}>
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                            </RechartsPieChart>
                                        </ChartContainer>
                                   </div>
                                </CardContent>
                            </Card>

                            <Card className="mt-6 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Cognitive Insights</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                {aiInsights.map((insight, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: index * 0.2 + 0.5}}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/50"
                                    >
                                        <Wand2 className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-indigo-700 dark:text-indigo-300">{insight}</p>
                                    </motion.div>
                                ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>

                     {!isProfiling && !analysisComplete && !isUploading && (
                        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Upload or connect a data source to begin analysis.</p>
                        </div>
                     )}
                </div>
            </div>
            <div className="absolute bottom-4 right-6 text-xs text-muted-foreground opacity-50 font-medium">
                IBM watsonx.data in action
            </div>
        </div>
    );
}
