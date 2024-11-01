"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, Download, HelpCircle, Loader2, Mail, Shield, Upload, Zap, Lock, Eye, FileText } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

const NavBar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-green-400"
      >
        SafeGuard
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex space-x-6"
      >
        <a href="#features" className="text-green-300 hover:text-green-400 transition-colors">Features</a>
        <a href="#how-it-works" className="text-green-300 hover:text-green-400 transition-colors">How It Works</a>
        <a href="#analyzer" className="text-green-300 hover:text-green-400 transition-colors">Analyzer</a>
      </motion.div>
    </div>
  </nav>
)

const FloatingIcons = () => {
  const iconPositions = [20, 40, 60, 80, 95]
  const icons = [
    { icon: <Lock key="lock" />, duration: 12 },
    { icon: <Shield key="shield" />, duration: 15 },
    { icon: <Eye key="eye" />, duration: 18 },
    { icon: <FileText key="filetext" />, duration: 14 },
    { icon: <Mail key="mail" />, duration: 16 }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={`floating-icon-${index}`}
          className="absolute text-green-500/10"
          initial={{ y: "100%", x: `${iconPositions[index]}%`, opacity: 0 }}
          animate={{
            y: "-100%",
            opacity: [0, 1, 0],
            x: `${iconPositions[index]}%`,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-black/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500/20 hover:border-green-500/50 transition-all duration-300"
    >
      <div className="text-green-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-green-300">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

const HowItWorksStep = ({ number, title, description }: HowItWorksStepProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-black font-bold flex items-center justify-center">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-green-300 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

export function SafeGuardLandingComponent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [emailContent, setEmailContent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const controls = useAnimation()
  const analyzerRef = useRef(null)

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    })
  }, [controls])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }
  const scrollToAnalyzer = () => {
    if (analyzerRef.current) {
      (analyzerRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <FloatingIcons />
      <NavBar />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.section
          className="text-center mb-20 pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            Fortify Your Inbox with AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            SafeGuard employs cutting-edge AI to detect and neutralize email threats before they reach you.
          </p>
          <Button
            onClick={scrollToAnalyzer}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
          >
            Analyze Your Email Now
          </Button>
        </motion.section>

        <section id="features" className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center text-green-400">Unparalleled Email Protection</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="AI-Powered Defense"
              description="Our advanced AI algorithms provide real-time protection against evolving email threats."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Lightning-Fast Analysis"
              description="Scan and analyze emails in milliseconds, ensuring your productivity isn't compromised."
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10" />}
              title="Deep Content Inspection"
              description="Go beyond surface-level scans with our thorough content and attachment analysis."
            />
          </div>
        </section>

        <section id="how-it-works" className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center text-green-400">How SafeGuard Works</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            <HowItWorksStep
              number={1}
              title="Email Submission"
              description="Simply paste your email content or upload an email file to our secure platform."
            />
            <HowItWorksStep
              number={2}
              title="AI Analysis"
              description="Our advanced AI scans every aspect of the email, including links, attachments, and hidden content."
            />
            <HowItWorksStep
              number={3}
              title="Threat Detection"
              description="Potential threats are identified and categorized based on their level of risk."
            />
            <HowItWorksStep
              number={4}
              title="Detailed Reporting"
              description="Receive a comprehensive report outlining any detected threats and recommended actions."
            />
          </div>
        </section>

        <section id="analyzer" ref={analyzerRef} className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center text-green-400">Email Threat Analyzer</h2>
          <motion.div 
            className="relative max-w-3xl mx-auto"
            animate={controls}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-700/20 rounded-lg filter blur-3xl"></div>
            <Card className="bg-black/70 backdrop-blur-lg border-green-500/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">Analyze Your Email</CardTitle>
                <CardDescription className="text-gray-400">Paste your email content or upload a file for instant analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your email content here..."
                  className="mb-4 bg-gray-800/50 border-green-500/30 placeholder-gray-500 text-white focus:border-green-500 transition-colors duration-300"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-500/30 border-dashed rounded-lg cursor-pointer bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-green-500" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        EML, MSG, PDF, or image files (MAX. 10MB)
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      accept=".eml,.msg,.pdf,image/*"
                    />
                  </label>
                </div>
                {file && <p className="mt-2 text-sm text-gray-400">File selected: {file.name}</p>}
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!emailContent && !file)}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-black font-bold transition-all duration-300 transform hover:scale-105"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Now"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <Card className="bg-black/70 backdrop-blur-lg border-green-500/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-400">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="url" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                      <TabsTrigger value="url" className="data-[state=active]:bg-green-500/50">URL Analysis</TabsTrigger>
                      <TabsTrigger value="steg" className="data-[state=active]:bg-green-500/50">Hidden Content</TabsTrigger>
                      <TabsTrigger value="safety" className="data-[state=active]:bg-green-500/50">Overall Safety</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                      <div className="space-y-4">
                        <div className="flex items-center text-green-400">
                          <CheckCircle2 className="mr-2" />
                          <span>https://example.com - Safe</span>
                        </div>
                        <div className="flex items-center text-red-400">
                          <AlertCircle className="mr-2" />
                          <span>https://suspicious-link.com - Potential Phishing Attempt</span>
                          <HelpCircle className="ml-2 cursor-help" />
                        
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="steg">
                      <p className="text-green-400 flex items-center">
                        <CheckCircle2 className="mr-2" />
                        No hidden content or steganography detected
                      </p>
                    </TabsContent>
                    <TabsContent value="safety">
                      <div className="p-4 bg-red-900/50 text-red-200 rounded-lg flex items-center">
                        <AlertCircle className="mr-2" />
                        <span>Moderate Risk: Suspicious URL detected. Exercise caution.</span>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="flex items-center bg-green-700/50 text-white hover:bg-green-600/50 border-green-500/50">
                  <Download className="mr-2 h-4 w-4" />
                  Download Detailed Report
                </Button>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}