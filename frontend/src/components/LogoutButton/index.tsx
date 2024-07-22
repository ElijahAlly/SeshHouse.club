'use client'

import axios from "axios"
import React from "react"
import { Button } from "../ui/button"

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await axios('/api/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      window.location.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button
      className="w-fit h-fit max-h-9 rounded-sm"
      variant={'destructive'}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton;