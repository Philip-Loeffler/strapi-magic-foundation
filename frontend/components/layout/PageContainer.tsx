import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  /** Optional extra class for the inner content block */
  className?: string;
}

/**
 * Primary container used across all main screens: outer padded grey background,
 * inner white content block with max width. Keeps layout consistent with About page.
 */
export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className="min-h-screen  py-10 px-6 sm:px-8 md:px-10 lg:px-14">
      <div
        className={`mx-auto w-full max-w-6xl bg-whitepx-6 sm:px-8 md:px-10 py-8 ${className}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
