import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster"
      duration={2000} // Toast will auto-dismiss after 2 seconds
      toastOptions={{
        classNames: {
          toast: `
            bg-white/20
            backdrop-blur-md
            text-foreground
            border-2 border-purple-500
            rounded-xl
            shadow-lg
            transition
            transform
            hover:scale-105
            opacity-0
            animate-fade-in-out
          `,
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
