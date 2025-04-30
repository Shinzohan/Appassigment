import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
