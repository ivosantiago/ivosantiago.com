'use client';

import { useState, useRef, useCallback, DragEvent, ClipboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function ImageIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0L2.5 11.06Zm6-3.06a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertTextAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        onChange(value + text);
        return;
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.slice(0, start) + text + value.slice(end);
      onChange(newValue);

      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
        textarea.focus();
      }, 0);
    },
    [value, onChange]
  );

  const uploadImage = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setUploading(true);
      const placeholder = `![Uploading ${file.name}...]()`;
      insertTextAtCursor(placeholder);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        // Replace placeholder with actual image markdown
        const imageMarkdown = `![${file.name}](${data.url})`;
        onChange(value.replace(placeholder, imageMarkdown));
      } catch (error) {
        console.error('Upload error:', error);
        // Remove placeholder on error
        onChange(value.replace(placeholder, ''));
        alert(error instanceof Error ? error.message : 'Failed to upload image');
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, insertTextAtCursor]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((f) => f.type.startsWith('image/'));
      if (imageFile) {
        uploadImage(imageFile);
      }
    },
    [uploadImage]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith('image/'));

      if (imageItem) {
        e.preventDefault();
        const file = imageItem.getAsFile();
        if (file) {
          uploadImage(file);
        }
      }
    },
    [uploadImage]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        uploadImage(file);
      }
      // Reset input so same file can be selected again
      e.target.value = '';
    },
    [uploadImage]
  );

  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex">
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

        {!showPreview && (
          <div className="flex items-center gap-2 pr-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1 rounded px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
              title="Upload image"
            >
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {uploading ? 'Uploading...' : 'Add image'}
              </span>
            </button>
          </div>
        )}
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
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onPaste={handlePaste}
            className={`min-h-[300px] w-full resize-y border-0 bg-white p-4 font-mono text-sm text-zinc-900 focus:ring-0 dark:bg-zinc-800 dark:text-zinc-100 ${
              isDragging ? 'bg-teal-50 dark:bg-teal-900/20' : ''
            }`}
            placeholder="Write your markdown content here...

Tip: Drag & drop or paste images directly!"
          />
          {isDragging && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded border-2 border-dashed border-teal-500 bg-teal-50/80 dark:bg-teal-900/50">
              <p className="text-lg font-medium text-teal-700 dark:text-teal-300">
                Drop image here
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
