interface ToastProps {
  message: string
}

export function Toast({ message }: ToastProps) {
  return (
    <aside 
      className={`toast ${message ? "show" : ""}`}
      aria-live="polite"
    >
      {message}
    </aside>
  )
}
