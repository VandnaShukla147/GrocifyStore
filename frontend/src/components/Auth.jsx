import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UserContext } from "../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Chrome } from "lucide-react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const API_URL = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"}/api/auth`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLogin, setUser } = useContext(UserContext);

  // 📌 Email/Password Auth
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "login" : "signup";
      const { data } = await axios.post(`${API_URL}/${endpoint}`, { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLogin(true);
      setUser(data.user);

      toast.success(isLogin ? "Welcome back!" : "Account created!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Google Auth
  const handleGoogleAuth = async () => {
    try {
      // Use shared provider with forced account chooser
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const mode = isLogin ? "signin" : "signup";

      const { data } = await axios.post(`${API_URL}/google`, { token: idToken, mode });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLogin(true);
      setUser(data.user);

      toast.success(mode === "signin" ? "Signed in with Google!" : "Account created with Google!");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-white">
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
