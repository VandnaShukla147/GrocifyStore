import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "../integrations/supabase/client";
import { UserContext } from "../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Chrome } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLogin, setUser } = useContext(UserContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLogin(true);
        setUser(session.user);
        localStorage.setItem("user", JSON.stringify(session.user));
        navigate("/"); // redirect to Home
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLogin(true);
        setUser(session.user);
        localStorage.setItem("user", JSON.stringify(session.user));
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, setLogin, setUser]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setLogin(true);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Welcome back!");
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        setUser(data.user);
        toast.success("Account created! Please check your email.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-white">
      {/* Animated background gradients */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(249,115,22,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(34,197,94,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 md:p-12">
          {/* Heading */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
              {isLogin ? "Welcome Back" : "Join Grocify"}
            </h1>
            <p className="text-gray-500">
              {isLogin
                ? "Sign in to continue shopping"
                : "Create your account today"}
            </p>
          </motion.div>

          {/* Auth Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEmailAuth}
              className="space-y-6"
            >
              {/* Email */}
              <div className="space-y-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/70"
                />
              </div>

              {/* Password */}
              <div className="space-y-2 text-left">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/70"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="w-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                onClick={handleGoogleAuth}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </motion.form>
          </AnimatePresence>

          {/* Switch Auth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-500 hover:text-green-600 transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
