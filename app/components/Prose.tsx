import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Prose({ children, className }: React.PropsWithChildren<Props>) {
  return (
    <div className={clsx(className, "prose dark:prose-invert")}>{children}</div>
  );
}
