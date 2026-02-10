import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "@/context/theme/themeContext";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id='theme-mode'
        checked={theme === "dark"}
        onCheckedChange={() => toggleTheme()}
      />
      <Label htmlFor='theme-mode'>
        Dark: {theme === "dark" ? "On" : "Off"}
      </Label>
    </div>
  );
};

export default ThemeSwitch;
