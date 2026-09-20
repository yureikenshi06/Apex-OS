import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/layout/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AmbientBackground } from '@/components/layout/ambient-background';
import { Logo } from '@/components/shared/logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/home';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-safe pb-safe relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-void p-5 font-sans">
      <AmbientBackground />

      <div className="animate-enter relative z-10 w-full max-w-[400px]">
        <div className="rounded-[24px] border border-line bg-surface-1 p-6 sm:p-8">
          <div className="mb-7 flex flex-col items-center gap-3 text-center">
            <Logo size={48} />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Apex OS</h1>
              <p className="mt-1 text-sm text-fg-muted">Sign in to your command centre</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate={false}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-fg-muted">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-fg-muted">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div
                role="alert"
                className="animate-enter flex items-start gap-2 rounded-xl border border-danger/25 bg-danger/[0.1] p-3 text-xs font-semibold text-red-400"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
