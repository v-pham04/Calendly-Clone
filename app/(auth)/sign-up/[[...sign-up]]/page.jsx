import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      forceRedirectUrl="/availability"
      fallbackRedirectUrl="/availability"
      signInForceRedirectUrl="/availability"
      signInFallbackRedirectUrl="/availability"
    />
  );
}
