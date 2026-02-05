"use client";

import { AlertTriangle, ArrowLeft, Home, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-destructive/5" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-destructive/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-destructive/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative glass-strong rounded-full p-6 border-2 border-destructive/50">
              <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-destructive" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="glass rounded-3xl p-8 md:p-12 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Something Went Wrong
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We encountered an unexpected error while loading this page. Don't
            worry, it's not your fault!
          </p>

          {/* Error Details (Development) */}
          {process.env.NODE_ENV === "development" && (
            <details className="text-left glass-subtle rounded-xl p-4 mt-4">
              <summary className="cursor-pointer font-semibold text-sm text-muted-foreground hover:text-foreground transition-colors">
                Error Details (Dev Mode)
              </summary>
              <div className="mt-3 space-y-2">
                <p className="text-xs text-destructive font-mono break-all">
                  <strong>Message:</strong> {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground font-mono">
                    <strong>Digest:</strong> {error.digest}
                  </p>
                )}
                {error.stack && (
                  <pre className="text-xs text-muted-foreground overflow-auto max-h-40 mt-2 p-2 bg-muted/50 rounded">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105 shadow-lg shadow-primary/30"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>

            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 glass-strong hover:glass border border-border px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </a>
          </div>

          {/* Help Section */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              If the problem persists, try these:
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Clear your browser cache and cookies</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Check your internet connection</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Try again in a few minutes</span>
              </div>
            </div>
          </div>

          {/* Support Link */}
          <div className="pt-4">
            <a
              href="mailto:support@moviedb.com"
              className="text-sm text-primary hover:text-primary/80 underline transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Fun Message */}
        <p className="mt-8 text-sm text-muted-foreground/60 italic">
          "In the movie of life, errors are just plot twists." 🎬
        </p>
      </div>
    </div>
  );
}
