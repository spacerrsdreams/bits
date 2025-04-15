import { ClerkProvider } from "@clerk/nextjs";
import ClerkAuthButtons from "./clerk-auth-button";

export default function ClerkAuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ClerkAuthButtons />
      {children}
    </ClerkProvider>
  );
}
