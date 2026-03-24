import { DisclaimerBanner } from '@/components/trust/disclaimer-banner';

export default function CalculatorsLayout({
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
