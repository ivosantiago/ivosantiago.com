'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { toast } from '@/components/ui/toast';

interface Item {
  id: string;
  label: string;
  done: boolean;
}

// The list. To cross something off, flip `done` to true and deploy.
const ITEMS: Array<Item> = [
  { id: 'blog', label: 'Launch a blog', done: false },
  { id: 'about', label: 'Refresh the About page', done: false },
  { id: 'now', label: 'Update the Now page', done: false },
  { id: 'projects', label: 'List my side projects here', done: false },
  { id: 'darkmode', label: 'Ship dark mode', done: true },
  { id: 'meta', label: 'Build this very to-do list', done: true },
];

const DENIALS = [
  'Nice try — only I cross these off ✌️',
  'Hands off my list 😏',
  'That’s a “me” job, sorry!',
  'This one’s cross-off-protected 🔒',
  'You’ll have to become me first.',
];

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 8.5 6.75 11.25 12 5"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TodoList() {
  const [nudgeId, setNudgeId] = useState<string | null>(null);
  const [next, setNext] = useState(0);

  function deny(id: string) {
    toast.add({
      title: DENIALS[next % DENIALS.length],
      timeout: 2500, // auto-dismiss after 2.5s
    });
    setNext((n) => n + 1);
    setNudgeId(id);
    window.setTimeout(() => setNudgeId((v) => (v === id ? null : v)), 400);
  }

  const doneCount = ITEMS.filter((i) => i.done).length;

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span className="mr-2 text-base">📝</span>
        <span>My little to-do list</span>
        <span className="ml-auto text-xs font-normal text-zinc-400 dark:text-zinc-500">
          🔒 look, don’t touch
        </span>
      </h2>
      <ul className="mt-6 space-y-1">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => deny(item.id)}
              aria-disabled="true"
              className={clsx(
                'group flex w-full items-center gap-3 rounded-lg px-1 py-1.5 text-left transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                nudgeId === item.id && 'animate-pulse',
              )}
            >
              <span
                className={clsx(
                  'flex h-5 w-5 flex-none items-center justify-center rounded-md border transition',
                  item.done
                    ? 'border-teal-500 bg-teal-500 text-white'
                    : 'border-zinc-300 text-transparent group-hover:border-zinc-400 dark:border-zinc-600',
                )}
              >
                <CheckIcon className="h-3.5 w-3.5 stroke-current" />
              </span>
              <span
                className={clsx(
                  'text-sm transition',
                  item.done
                    ? 'text-zinc-400 line-through dark:text-zinc-500'
                    : 'text-zinc-700 dark:text-zinc-300',
                )}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-500">
        {doneCount === ITEMS.length
          ? 'All done. Now what? 😅'
          : `${ITEMS.length - doneCount} left — one day…`}
      </p>
    </div>
  );
}
