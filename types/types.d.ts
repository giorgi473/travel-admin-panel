// sidebar navigation interface start
export interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  items?: { title: string; url: string }[];
}
// sidebar navigation interface and
