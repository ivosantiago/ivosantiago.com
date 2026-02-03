'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
      <div className="flex border-b border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`px-4 py-2 text-sm font-medium ${
            !showPreview
              ? 'bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`px-4 py-2 text-sm font-medium ${
            showPreview
              ? 'bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          Preview
        </button>
      </div>

      {showPreview ? (
        <div className="prose prose-zinc dark:prose-invert min-h-[300px] max-w-none p-4">
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-zinc-400">Nothing to preview</p>
          )}
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[300px] w-full resize-y border-0 bg-white p-4 font-mono text-sm text-zinc-900 focus:ring-0 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="Write your markdown content here..."
        />
      )}
    </div>
  );
}
