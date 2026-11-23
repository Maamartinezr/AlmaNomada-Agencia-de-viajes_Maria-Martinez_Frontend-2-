import {
  Compass,
  Heart,
  Users,
  Sun,
  Leaf,
  MapPin,
  Plane,
  Building2,
  Check,
  Menu,
  X,
  ShieldCheck,
  Mountain,
  Mail,
  Clock,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
const icons = {
  compass: Compass,
  heart: Heart,
  users: Users,
  sun: Sun,
  leaf: Leaf,
  pin: MapPin,
  plane: Plane,
  hotel: Building2,
  check: Check,
  menu: Menu,
  close: X,
  shield: ShieldCheck,
  mountain: Mountain,
  mail: Mail,
  clock: Clock,
  calendar: Calendar,
  external: ArrowUpRight,
};
export default function Icon({ name, size = 22, ...props }) {
  const Component = icons[name] || Compass;
  return (
    <Component size={size} strokeWidth={1.5} aria-hidden="true" {...props} />
  );
}
