"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/language-context"
import { Search, Palette, Code, CheckCircle, Sparkles } from "lucide-react"

const loadingSteps = [
  { key: "analyzing", icon: Search },
  { key: "designing", icon: Palette },
  { key: "generating", icon: Code },
  { key: "finalizing", icon: CheckCircle },
]

export default function LoadingPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = 2000 // 2 seconds per step
    const totalDuration = stepDuration * loadingSteps.length

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Redirect to chat page when complete
          setTimeout(() => router.push("/chat"), 500)
          return 100
        }
        return prev + 100 / (totalDuration / 100)
      })
    }, 100)

    // Step animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, stepDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {/* Logo/Icon */}
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">{t("loading.title")}</h1>

          {/* Progress Bar */}
          <Progress value={progress} className="mb-8" />

          {/* Loading Steps */}
          <div className="space-y-4">
            {loadingSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep

              return (
                <div
                  key={step.key}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : isCompleted
                        ? "bg-green-50 text-green-600"
                        : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      isActive
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-muted"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>

                  <span className="font-medium">{t(`loading.${step.key}`)}</span>

                  {isActive && (
                    <div className="ml-auto">
                      <div className="flex gap-1">
                        <div className="h-1 w-1 bg-current rounded-full animate-bounce"></div>
                        <div
                          className="h-1 w-1 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-1 w-1 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress Text */}
          <div className="mt-6 text-sm text-muted-foreground">
            {Math.round(progress)}% {t("common.loading")}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
