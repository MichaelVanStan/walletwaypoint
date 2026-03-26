import { DisclaimerBanner } from '@/components/trust/disclaimer-banner';

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DisclaimerBanner />
      {children}
    </>
  );
}
