import type { LucideIcon } from "lucide-react";
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  CloudRain,
  Cloud,
  Snowflake,
  Wind,
  Umbrella,
} from "lucide-react";

export const Logo = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v4" />
    <path d="m5 5 2 2" />
    <path d="M22 12h-4" />
    <path d="m5 19 2-2" />
    <path d="M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0Z" />
  </svg>
);

export const weatherIcons: Record<string, LucideIcon> = {
  "clear-day": Sun,
  "clear-night": Moon,
  "partly-cloudy-day": CloudSun,
  "partly-cloudy-night": CloudMoon,
  rain: CloudRain,
  cloudy: Cloud,
  snow: Snowflake,
  windy: Wind,
  showers: Umbrella,
};

export const Icons = {
  logo: Logo,
  sun: Sun,
  moon: Moon,
  ...weatherIcons,
};