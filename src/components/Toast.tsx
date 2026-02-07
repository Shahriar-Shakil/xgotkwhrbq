"use client";

import { AlertCircle, Check, Info, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const iconMap = {
    success: <Check className="w-5 h-5 text-green-500" />,
    error: <X className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgMap = {
    success: "bg-green-500/20 border-green-500/30",
    error: "bg-red-500/20 border-red-500/30",
    warning: "bg-yellow-500/20 border-yellow-500/30",
    info: "bg-blue-500/20 border-blue-500/30",
  };

  return (
    <div className="fixed top-0 right-4 z-[100] animate-in slide-in-from-top-2 fade-in duration-300">
      <div
        className={`
          glass-strong border rounded-xl px-4 py-3 shadow-2xl 
          flex items-center gap-3 min-w-[280px] max-w-[400px]
          ${bgMap[type]}
        `}
      >
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${type === "success" && "bg-green-500/20"}
            ${type === "error" && "bg-red-500/20"}
            ${type === "warning" && "bg-yellow-500/20"}
            ${type === "info" && "bg-blue-500/20"}
          `}
        >
          {iconMap[type]}
        </div>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted/50 rounded-full transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
