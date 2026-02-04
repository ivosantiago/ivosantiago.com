import clsx from 'clsx';

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        className,
        'prose prose-zinc dark:prose-invert',
        // Headings
        'prose-headings:font-semibold prose-headings:tracking-tight',
        // Links
        'prose-a:text-teal-500 prose-a:no-underline hover:prose-a:text-teal-600 dark:prose-a:text-teal-400 dark:hover:prose-a:text-teal-300',
        // Code blocks
        'prose-pre:rounded-xl prose-pre:bg-zinc-900 prose-pre:shadow-lg dark:prose-pre:bg-zinc-800/60',
        'prose-code:before:content-none prose-code:after:content-none',
        // Blockquotes
        'prose-blockquote:border-l-teal-500',
      )}
    >
      {children}
    </div>
  );
}
