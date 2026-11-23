import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NavigationEffects({ onNavigate }) {
  const { pathname } = useLocation();
  useEffect(() => {
    onNavigate();
    document.title =
      "Alma Nómada · " +
      (pathname === "/" ? "Viaja libre" : pathname.split("/")[1]);
  }, [pathname, onNavigate]);
  return null;
}
