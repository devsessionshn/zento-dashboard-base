import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const kpis: { titleKey: TranslationKey; value: string; change: string; trend: "up" | "down"; icon: typeof DollarSign }[] = [
  { titleKey: "totalRevenue", value: "$45,231", change: "+20.1%", trend: "up", icon: DollarSign },
  { titleKey: "activeUsers", value: "2,350", change: "+15.3%", trend: "up", icon: Users },
  { titleKey: "orders", value: "1,247", change: "-2.4%", trend: "down", icon: ShoppingCart },
  { titleKey: "conversionRate", value: "3.2%", change: "+4.1%", trend: "up", icon: Activity },
];

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 198 },
  { month: "Mar", revenue: 5000, orders: 305 },
  { month: "Apr", revenue: 4500, orders: 278 },
  { month: "May", revenue: 6000, orders: 389 },
  { month: "Jun", revenue: 5500, orders: 349 },
  { month: "Jul", revenue: 7000, orders: 430 },
];

const channelData = [
  { name: "Direct", value: 35 },
  { name: "Organic", value: 30 },
  { name: "Referral", value: 20 },
  { name: "Social", value: 15 },
];

const COLORS = [
  "hsl(172, 82%, 44%)",
  "hsl(231, 100%, 66%)",
  "hsl(258, 95%, 64%)",
  "hsl(172, 82%, 54%)",
];

const recentActivity: { user: string; actionKey: TranslationKey; time: string; amount: string | null }[] = [
  { user: "Alex M.", actionKey: "completedPurchase", time: "2 min ago", amount: "$124.00" },
  { user: "Sarah K.", actionKey: "newRegistration", time: "5 min ago", amount: null },
  { user: "James L.", actionKey: "upgradedPlan", time: "12 min ago", amount: "$49.00" },
  { user: "Maria D.", actionKey: "submittedTicket", time: "18 min ago", amount: null },
  { user: "Tom W.", actionKey: "completedPurchase", time: "25 min ago", amount: "$89.50" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Index = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <h1 className="text-2xl font-bold mb-1">{t("welcomeTitle")}</h1>
          <p className="text-muted-foreground mb-6">{t("welcomeMessage")}</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi) => (
            <motion.div key={kpi.titleKey} variants={item}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{t(kpi.titleKey)}</span>
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <kpi.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">{kpi.value}</span>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        kpi.trend === "up" ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {kpi.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">{t("revenueOverview")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(172, 82%, 44%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(172, 82%, 44%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 90%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(240, 4%, 46%)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(240, 4%, 46%)" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid hsl(240, 6%, 90%)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(172, 82%, 44%)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">{t("trafficSources")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {channelData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full">
                  {channelData.map((ch, i) => (
                    <div key={ch.name} className="flex items-center gap-2 text-xs">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: COLORS[i] }}
                      />
                      <span className="text-muted-foreground">{ch.name}</span>
                      <span className="ml-auto font-medium">{ch.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">{t("ordersByMonth")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 90%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(240, 4%, 46%)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(240, 4%, 46%)" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid hsl(240, 6%, 90%)",
                      }}
                    />
                    <Bar dataKey="orders" fill="hsl(231, 100%, 66%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">{t("recentActivity")}</CardTitle>
                <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                  {t("viewAll")} <ArrowUpRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                          {act.user.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-tight">{act.user}</p>
                          <p className="text-xs text-muted-foreground">{t(act.actionKey)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {act.amount && (
                          <p className="text-sm font-medium">{act.amount}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
