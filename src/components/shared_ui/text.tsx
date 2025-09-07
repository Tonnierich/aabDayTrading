import type React from "react"

interface TextProps {
  children: React.ReactNode
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  color?: "general" | "prominent" | "less-prominent" | "profit-success" | "loss-danger"
  className?: string
}

const Text: React.FC<TextProps> = ({ children, size = "md", color = "general", className = "" }) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  const colorClasses = {
    general: "text-gray-600 dark:text-gray-400",
    prominent: "text-gray-900 dark:text-gray-100",
    "less-prominent": "text-gray-500 dark:text-gray-500",
    "profit-success": "text-green-600 dark:text-green-400",
    "loss-danger": "text-red-600 dark:text-red-400",
  }

  const classes = `${sizeClasses[size]} ${colorClasses[color]} ${className}`.trim()

  return <span className={classes}>{children}</span>
}

export default Text
