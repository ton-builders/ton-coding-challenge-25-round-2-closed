"use client"

import { useEffect } from "react"
import { viewport, init } from "@telegram-apps/sdk-react"

export default function Page() {
  useEffect(() => {
    async function fullscreen() {
      init()

      if (viewport.mount.isAvailable()) {
        await viewport.mount()
        viewport.expand()
      }

      if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen()
      }
    }

    fullscreen()
  }, [])

  return (
    <div
      style={{
        fontSize: "100px",
        color: "red",
      }}
    >
      <div>@ya_bel</div>
    </div>
  )
}
