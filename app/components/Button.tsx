import clsx from "clsx";

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<React.ComponentProps<"button">, "ref"> & {
    variant?: keyof typeof variantStyles;
    fileName?: string;
  };

export function Button({
  variant = "primary",
  className,
  href,
  fileName,
  ...props
}: Props) {
  className = clsx(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    variantStyles[variant],
    className
  );

  return href ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={href} download={fileName} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
