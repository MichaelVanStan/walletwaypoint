import { DisclaimerBanner } from '@/components/trust/disclaimer-banner';

export default function GuidesLayout({
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
