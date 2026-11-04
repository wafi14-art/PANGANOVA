export interface NavItemConfig {
  id: string;
  href: string;
  titleKey: string;
  iconName: 'LayoutGrid' | 'TrendingUp' | 'SlidersHorizontal' | 'Wallet' | 'BookOpen';
  isAvailable: boolean;
  isPlanned?: boolean;
}

export const navigationItems: NavItemConfig[] = [
  {
    id: 'executive-summary',
    href: '/dashboard',
    titleKey: 'nav.executiveSummary',
    iconName: 'LayoutGrid',
    isAvailable: true,
  },
  {
    id: 'price-trends',
    href: '/price-trends',
    titleKey: 'nav.priceTrends',
    iconName: 'TrendingUp',
    isAvailable: true,
  },
  {
    id: 'commodity-comparison',
    href: '/commodity-comparison',
    titleKey: 'nav.commodityComparison',
    iconName: 'SlidersHorizontal',
    isAvailable: true,
  },
  {
    id: 'purchasing-power',
    href: '/purchasing-power',
    titleKey: 'nav.purchasingPower',
    iconName: 'Wallet',
    isAvailable: false,
    isPlanned: true,
  },
  {
    id: 'insights',
    href: '/insights',
    titleKey: 'nav.insights',
    iconName: 'BookOpen',
    isAvailable: false,
    isPlanned: true,
  },
];

