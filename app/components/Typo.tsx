import React from 'react'
import { twMerge } from 'tailwind-merge';


interface TypoProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: 'title' | 'subtitle' | 'body';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Typo = ({ variant, size, children, ...props }: TypoProps) => {
  const variants = {
    title: 'text-6xl uppercase font-bold tracking-wide',
    subtitle: 'text-2xl md:text-4xl uppercase font-semibold tracking-wide',
    body: 'text-base'
  }

  return (
    <p className={twMerge(variants[variant])} {...props}>{children}</p>
  )
}

export default Typo
