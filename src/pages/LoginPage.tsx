import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import zentoLogo from "@/assets/zento-logo-full.png";

function useCanvasBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let particles: { x: number; y: number; vx: number; vy: number; r: number; color: string; baseAlpha: number }[] = [];

    const palette = [
      [172, 82, 44],
      [231, 100, 66],
      [258, 95, 64],
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      particles = Array.from({ length: count }, () => {
        const c = palette[Math.floor(Math.random() * palette.length)];
        const baseAlpha = Math.random() * 0.15 + 0.05;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2.5 + 0.8,
          color: `hsla(${c[0]}, ${c[1]}%, ${c[2]}%, `,
          baseAlpha,
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = () => {
      // Dark gradient background
      const grad = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      grad.addColorStop(0, "hsl(240, 12%, 11%)");
      grad.addColorStop(0.5, "hsl(240, 9%, 8%)");
      grad.addColorStop(1, "hsl(250, 15%, 5%)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glowing orbs
      const time = Date.now() * 0.001;
      const orbs = [
        { x: canvas.width * 0.2 + Math.sin(time * 0.3) * 80, y: canvas.height * 0.3 + Math.cos(time * 0.4) * 60, r: 250, color: "172, 82%, 44%" },
        { x: canvas.width * 0.75 + Math.cos(time * 0.25) * 100, y: canvas.height * 0.7 + Math.sin(time * 0.35) * 70, r: 300, color: "231, 100%, 66%" },
        { x: canvas.width * 0.5 + Math.sin(time * 0.2) * 60, y: canvas.height * 0.15 + Math.cos(time * 0.3) * 40, r: 200, color: "258, 95%, 64%" },
      ];

      for (const orb of orbs) {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, `hsla(${orb.color}, 0.08)`);
        g.addColorStop(0.5, `hsla(${orb.color}, 0.03)`);
        g.addColorStop(1, `hsla(${orb.color}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = 0.08 * (1 - dist / 100);
            ctx.beginPath();
            ctx.strokeStyle = `hsla(172, 82%, 44%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (const p of particles) {
        // Mouse proximity glow
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const boost = mDist < 200 ? (1 - mDist / 200) * 0.4 : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.baseAlpha + boost) + ")";
        ctx.fill();

        if (boost > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + (boost * 0.15) + ")";
          ctx.fill();
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useCanvasBackground(canvasRef);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@zento.com" && password === "admin123") {
        localStorage.setItem("zento-auth", "true");
        navigate("/");
      } else {
        setError("Credenciales inválidas. Usa admin@zento.com / admin123");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsla(172, 82%, 44%, 0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(172, 82%, 44%, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="shadow-2xl border-border/30 backdrop-blur-xl bg-card/80"
          style={{
            boxShadow: "0 0 80px -20px hsla(172, 82%, 44%, 0.15), 0 0 40px -10px hsla(231, 100%, 66%, 0.1), 0 25px 50px -12px rgba(0,0,0,0.5)",
          }}
        >
          <CardHeader className="items-center text-center space-y-3 pt-8">
            <motion.img
              src={zentoLogo}
              alt="Zento"
              className="h-14 mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
              <CardDescription className="mt-1.5">
                Ingresa tus credenciales para acceder al panel
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="pb-8">
            <motion.form
              onSubmit={handleLogin}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@zento.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              {error && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {error}
                </motion.p>
              )}
              <Button
                type="submit"
                className="w-full h-11 font-semibold text-sm tracking-wide"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, hsl(172, 82%, 44%), hsl(231, 100%, 66%))",
                }}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
