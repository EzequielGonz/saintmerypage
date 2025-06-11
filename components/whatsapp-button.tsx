"use client"

import { PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  return (
    <Button
      className="fixed bottom-4 right-20 bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-lg z-40"
      onClick={() =>
        window.open(
          "https://wa.me/542235256172?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20Saintmery.",
          "_blank",
        )
      }
    >
      <PhoneIcon className="h-6 w-6" />
    </Button>
  )
}
