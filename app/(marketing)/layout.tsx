import { EnvVarWarning } from "@/components/supabase-components/env-var-warning";
import { AuthButton } from "@/components/supabase-components/auth-button";
import { ThemeSwitcher } from "@/components/supabase-components/theme-switcher";

import { hasEnvVars } from "@/lib/utils";

import { Logo } from "@/components/layout/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Header */}
      <header className="w-full border-b border-b-foreground/10">
        <nav className="w-full flex justify-center h-16">
          <div className="w-full max-w-5xl flex items-center p-3 px-5 text-sm relative">
            <div className="flex items-center">
              <Logo showText={true} className="text-foreground" />
            </div>

            <div className="ml-auto">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">{children}</main>

      {/* Global Footer */}
      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
        <p>© 2025 Training Platform</p>
        <ThemeSwitcher />
      </footer>
    </div>
  );
}
