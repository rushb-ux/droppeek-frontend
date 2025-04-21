"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy } from "lucide-react"

type PromoCodeProps = {
  code: string
  bonusText: string
  description?: string
}

const PromoCode = ({ code, bonusText, description }: PromoCodeProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="flex w-full max-w-2xl mx-auto bg-emerald-800 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-white text-black px-4 py-6 flex items-center justify-center w-20">
        <div className="text-xs tracking-widest rotate-90">283721291573</div>
      </div>

      <CardContent className="flex-1 p-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold tracking-wide">{bonusText}</h2>
          <p className="text-sm uppercase">{code}</p>
        </div>

        {description && (
          <div className="flex items-center justify-center text-xs text-white/80">
            {description}
          </div>
        )}

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleCopy}
            className="bg-white text-indigo-800 hover:bg-gray-100 px-6 py-2 rounded-md text-sm"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy Code"}
          </Button>
        </div>
      </CardContent>

    </Card>
  )
}

export default PromoCode
