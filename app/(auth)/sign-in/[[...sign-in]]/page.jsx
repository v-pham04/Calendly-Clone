import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      forceRedirectUrl="/availability"
      fallbackRedirectUrl="/availability"
      signUpForceRedirectUrl="/availability"
      signUpFallbackRedirectUrl="/availability"
    />
  );
}
