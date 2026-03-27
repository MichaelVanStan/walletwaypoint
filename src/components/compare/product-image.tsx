'use client';

import Image from 'next/image';

type ProductCategory = 'credit-cards' | 'personal-loans' | 'savings-accounts' | 'insurance';

interface ProductImageProps {
  imageUrl?: string;
  name: string;
  issuer: string;
  category?: ProductCategory;
  className?: string;
}

const issuerGradients: Record<string, string> = {
  // Credit card issuers
  'Chase': 'from-blue-700 to-blue-900',
  'Citi': 'from-blue-500 to-blue-600',
  'Capital One': 'from-red-600 to-red-800',
  'Discover': 'from-orange-500 to-orange-600',
  'American Express': 'from-emerald-600 to-emerald-800',
  'Bank of America': 'from-red-700 to-red-900',
  'Wells Fargo': 'from-yellow-600 to-yellow-700',
  // Personal loan lenders
  'SoFi': 'from-sky-500 to-sky-700',
  'LightStream': 'from-teal-500 to-teal-700',
  'Marcus by Goldman Sachs': 'from-blue-800 to-blue-950',
  'Best Egg': 'from-green-500 to-green-700',
  'Prosper': 'from-emerald-500 to-emerald-700',
  'Upgrade': 'from-indigo-500 to-indigo-700',
  'LendingClub': 'from-blue-600 to-blue-800',
  'Upstart': 'from-violet-500 to-violet-700',
  'Avant': 'from-cyan-600 to-cyan-800',
  'PenFed Credit Union': 'from-blue-700 to-blue-900',
  'Navy Federal Credit Union': 'from-blue-800 to-blue-950',
  // Savings & CD banks
  'Ally Bank': 'from-violet-600 to-violet-800',
  'Wealthfront': 'from-indigo-500 to-indigo-700',
  'Barclays': 'from-cyan-600 to-cyan-800',
  'CIT Bank': 'from-blue-500 to-blue-700',
  // Insurance providers
  'GEICO': 'from-blue-600 to-blue-800',
  'Progressive': 'from-blue-500 to-blue-700',
  'State Farm': 'from-red-600 to-red-800',
  'USAA': 'from-blue-700 to-blue-900',
  'Allstate': 'from-blue-600 to-blue-800',
  'Liberty Mutual': 'from-yellow-500 to-yellow-700',
  'Nationwide': 'from-blue-700 to-blue-900',
  'Lemonade': 'from-pink-500 to-pink-700',
};

const defaultGradient = 'from-slate-500 to-slate-700';

function getGradient(issuer: string): string {
  return issuerGradients[issuer] ?? defaultGradient;
}

function getInitials(issuer: string): string {
  return issuer
    .split(/\s+/)
    .filter(w => !['by', 'of', 'the', 'and', '&'].includes(w.toLowerCase()))
    .map(w => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export function ProductImage({ imageUrl, name, issuer, category, className }: ProductImageProps) {
  if (imageUrl) {
    return (
      <div className={`w-20 h-[50px] flex items-center justify-center ${className ?? ''}`}>
        <Image
          src={imageUrl}
          width={80}
          height={50}
          alt={name}
          className="rounded-md object-contain"
        />
      </div>
    );
  }

  const gradient = getGradient(issuer);

  // Credit cards: show card-style placeholder with chip and card name
  if (!category || category === 'credit-cards') {
    return (
      <div
        className={`w-20 h-[50px] rounded-md flex flex-col items-start justify-end p-1.5 bg-gradient-to-br ${gradient} ${className ?? ''}`}
      >
        <div className="w-4 h-3 rounded-sm bg-yellow-300/60 mb-auto" />
        <span className="text-[7px] leading-tight text-white/80 font-medium truncate w-full">
          {name}
        </span>
      </div>
    );
  }

  // Other categories: show logo-style with issuer initials
  return (
    <div
      className={`w-11 h-11 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradient} ${className ?? ''}`}
    >
      <span className="text-xs font-bold text-white tracking-wide">
        {getInitials(issuer)}
      </span>
    </div>
  );
}
