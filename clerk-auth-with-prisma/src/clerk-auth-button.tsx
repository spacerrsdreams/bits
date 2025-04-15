import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function ClerkAuthButtons() {
  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16 bg-red-500">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
