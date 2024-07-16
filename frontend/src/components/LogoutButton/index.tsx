'use client'

import axios from "axios"
import React from "react"
import { Button } from "../ui/button"
import { NavigationMenuLink } from "../ui/navigation-menu"

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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <NavigationMenuLink
      className="bg-red-600"
      href="/" 
      onClick={handleLogout}
    >Logout</NavigationMenuLink>
  )
}

export default LogoutButton;