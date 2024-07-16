"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DropdownContent from "../DropdownContent"

export function ToggleTheme() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='flex justify-between w-20 px-2'>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownContent />
    </DropdownMenu>
  )
}