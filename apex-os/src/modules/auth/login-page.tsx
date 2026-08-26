import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/layout/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { AmbientBackground } from '@/components/layout/ambient-background';

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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#05060a] overflow-hidden font-sans p-4">
      {/* Live Ambient Neon Background */}
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="z-10 w-full max-w-md"
      >
        <Card className="border border-white/10 bg-[#090d18]/85 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden hover:border-blue-500/30 transition-all">
          <CardHeader className="space-y-4 text-center pb-2 pt-8">
            {/* Cyber Monogram Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] shadow-xl shadow-blue-600/30"
            >
              <div className="w-full h-full bg-[#080b16] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/10 opacity-50" />
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" fill="currentColor">
                  <path d="M12 2L2 20h4.5l5.5-10.5 5.5 10.5H22L12 2zm0 6.5l3.2 6.5H8.8L12 8.5z" />
                </svg>
              </div>
            </motion.div>

            <div>
              <div className="flex items-center justify-center gap-2">
                <CardTitle className="text-2xl font-black text-white tracking-wider font-mono">APEX</CardTitle>
                <span className="text-xs font-black px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-400 border border-blue-500/30 tracking-widest font-mono">
                  OS
                </span>
              </div>
              <CardDescription className="text-zinc-400 text-xs mt-1 font-medium">
                Executive Command System
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8 pt-4">
            <form onSubmit={handleLogin} className="space-y-5">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1.5"
              >
                <Label htmlFor="email" className="text-xs font-semibold text-zinc-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 rounded-xl h-11 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-1.5"
              >
                <Label htmlFor="password" className="text-xs font-semibold text-zinc-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 rounded-xl h-11 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm"
                />
              </motion.div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-600/30 transition-all gap-2 text-sm group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
