'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", onClick, children, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} className={twMerge(`text-[5vw] lg:text-6xl uppercase border-2 px-8 py-4 font-semibold tracking-wide cursor-pointer hover:bg-foreground hover:text-background ${variant === "secondary" ? "bg-blue-300 border-none text-white" : variant === "danger" && "bg-red-500 text-white"} transition-colors duration-300 `, props.className)} {...props}>
      {children}
    </button>
  )
}

export default Button
