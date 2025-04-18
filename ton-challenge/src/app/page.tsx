"use client"

import { useEffect } from "react"
import { viewport, init } from "@telegram-apps/sdk-react"

export default function Home() {
  const fullscreen = async () => {
    init()

    if (viewport.mount.isAvailable()) {
      await viewport.mount()
      viewport.expand()
    }

    if (viewport.requestFullscreen.isAvailable()) {
      await viewport.requestFullscreen()
    }
  }

  useEffect(() => {
    fullscreen()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      @dyshko
    </div>
  )
}
