"use client"

import { useEffect, useState } from "react"
import { viewport, init, isTMA, initData } from "@telegram-apps/sdk-react"

export default function Home() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function initTg() {
      if (await isTMA()) {
        init()

        if (viewport.mount.isAvailable()) {
          await viewport.mount()
          viewport.expand()
        }

        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen()
        }

        initData.restore()
      }
    }

    initTg().then(() => {
      fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${initData.raw()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUsername(data.username)
          else setError(data.error)
        })
        .catch(() => setError("Server error"))
    })
  }, [])

  return (
    <div className="flex items-center flex-col justify-center h-screen text-5xl">
      <div>Dev username: @wDRxxx</div>
      <div className="mt-5">
        {error === "" ? (
          <div>Your username: {"@" + username || "Loading..."}</div>
        ) : (
          <div>Error of verification: {error}</div>
        )}
      </div>
    </div>
  )
}
