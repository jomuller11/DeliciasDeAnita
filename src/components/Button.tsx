import { ButtonHTMLAttributes, forwardRef } from "react";

/* ─── Button — 4 variants from Design System §06 ─────────── */
type Variant = "primary" | "outline" | "dark" | "soft";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANT_STYLES: Record<Variant, string> = {
  // primary: verde on azul-dk text — flagship CTA
  primary:
    "bg-verde text-azul-dk hover:brightness-95 active:scale-[0.97]",
  // outline: transparent with azul-dk border — secondary
  outline:
    "bg-transparent text-azul-dk border-2 border-azul-dk hover:bg-azul-dk hover:text-white active:scale-[0.97]",
  // dark: azul-dk solid — high authority
  dark:
    "bg-azul-dk text-white hover:bg-azul active:scale-[0.97]",
  // soft: crema — gentle CTA
  soft:
    "bg-crema text-azul-dk hover:brightness-95 active:scale-[0.97]",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-4 py-2 text-[12px]",
  md: "px-[22px] py-3 text-[13px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...rest }, ref) => (
    <button
      ref={ref}
      className={[
        "inline-flex items-center justify-center gap-2",
        "font-body font-semibold tracking-[0.5px]",
        "rounded-md cursor-pointer",
        "shadow-[var(--shadow-sm)] active:shadow-none",
        "transition-all duration-[180ms]",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      ].join(" ")}
      {...rest}
    />
  )
);
Button.displayName = "Button";
