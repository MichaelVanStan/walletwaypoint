import { DisclaimerBanner } from '@/components/trust/disclaimer-banner';

export default function HubsLayout({
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
