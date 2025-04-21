
import { Coffee, Utensils, Percent, Navigation, Info, FileText, CalendarRange } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: Coffee, size: 18 },
  { name: 'Menu', path: '/menu', icon: Utensils, size: 18 },
  { name: 'Deals', path: '/deals', icon: Percent, size: 18 },
  { name: 'Locations', path: '/find-location', icon: Navigation, size: 18 },
  { name: 'About', path: '/about', icon: Info, size: 18 },
  { name: 'References', path: '/references', icon: FileText, size: 18 },
  { name: 'Reservations', path: '/reservations', icon: CalendarRange, size: 18 }
];
