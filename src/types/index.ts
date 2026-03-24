export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  children?: NavItem[];
}

export interface FooterNavigation {
  tools: NavItem[];
  learn: NavItem[];
  company: NavItem[];
  legal: NavItem[];
}
