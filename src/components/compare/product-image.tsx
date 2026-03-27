'use client';

import Image from 'next/image';

interface ProductImageProps {
  imageUrl?: string;
  name: string;
  issuer: string;
  className?: string;
}

const issuerGradients: Record<string, string> = {
  'Chase': 'from-blue-700 to-blue-900',
  'Citi': 'from-blue-500 to-blue-600',
  'Capital One': 'from-red-600 to-red-800',
  'Discover': 'from-orange-500 to-orange-600',
  'American Express': 'from-emerald-600 to-emerald-800',
  'Bank of America': 'from-red-700 to-red-900',
  'Wells Fargo': 'from-yellow-600 to-yellow-700',
};

const defaultGradient = 'from-slate-500 to-slate-700';

function getGradient(issuer: string): string {
  return issuerGradients[issuer] ?? defaultGradient;
}

export function ProductImage({ imageUrl, name, issuer, className }: ProductImageProps) {
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
