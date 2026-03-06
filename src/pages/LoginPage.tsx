import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import zentoLogo from "@/assets/zento-logo-full.png";

function useCanvasBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Decorative arcs
    const drawArcs = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Background gradient using palette colors
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "hsl(172, 82%, 44%)");
      grad.addColorStop(0.5, "hsl(231, 100%, 66%)");
      grad.addColorStop(1, "hsl(258, 95%, 64%)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Decorative circles/arcs
      ctx.strokeStyle = "hsla(0, 0%, 100%, 0.1)";
      ctx.lineWidth = 1.5;

      // Bottom-right arc
      ctx.beginPath();
      ctx.arc(w * 0.9, h * 0.95, w * 0.35, 0, Math.PI * 1.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(w * 0.9, h * 0.95, w * 0.25, 0, Math.PI * 1.5);
      ctx.stroke();

      // Top-left subtle arc
      ctx.beginPath();
      ctx.arc(w * 0.1, h * 0.05, w * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Floating dots
      ctx.fillStyle = "hsla(0, 0%, 100%, 0.15)";
      const dots = [
        [w * 0.15, h * 0.3, 4],
        [w * 0.8, h * 0.15, 3],
        [w * 0.6, h * 0.7, 5],
        [w * 0.3, h * 0.8, 3],
        [w * 0.75, h * 0.5, 4],
        [w * 0.5, h * 0.2, 2],
      ];
      for (const [x, y, r] of dots) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Floating particles
    let particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];

    const initParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.floor((w * h) / 20000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      drawArcs();

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    const init = () => {
      resize();
      initParticles();
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - branding / illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-muted p-12">
        <div className="max-w-md text-center space-y-6">
          <img src={zentoLogo} alt="Zento" className="h-40 mx-auto" />
          <h2 className="text-3xl font-bold text-foreground">
            Bienvenido a Zento
          </h2>
          <p className="text-muted-foreground text-lg">
            Gestiona tu inventario, usuarios y configuraciones desde un solo lugar.
          </p>
        </div>
      </div>

      {/* Right side - login form over canvas */}
      <div className="relative flex-1 flex items-center justify-center min-h-screen lg:min-h-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 w-full max-w-md mx-auto p-6">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img src={zentoLogo} alt="Zento" className="h-20" />
          </div>

          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-border/30">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-card-foreground">¡Hola!</h1>
              <p className="text-muted-foreground">Inicia sesión para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@zento.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 rounded-full border-border bg-muted/50 text-card-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-12 rounded-full border-border bg-muted/50 text-card-foreground"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full h-12 rounded-full text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
