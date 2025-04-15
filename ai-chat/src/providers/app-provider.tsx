import { QueryClientProvider } from "./query-client-provider";
import { ThemeProvider } from "./theme-provider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};
