import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, Palette, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SettingsPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <h1 className="text-2xl font-bold mb-1">{t("settings")}</h1>
      <p className="text-muted-foreground mb-6">{t("settingsDescription")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{t("profile")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("profilePlaceholder")}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{t("security")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("securityPlaceholder")}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{t("appearance")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("appearancePlaceholder")}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{t("languageLabel")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("languagePlaceholder")}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsPage;
