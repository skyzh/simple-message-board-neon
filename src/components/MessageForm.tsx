'use client';

import { useState } from 'react';
import { useUser } from '@stackframe/stack';
import { createMessage } from '@/lib/actions';
import { UserAvatar } from './UserAvatar';

interface MessageFormProps {
  onMessagePosted?: (message: any) => void;
}

export function MessageForm({ onMessagePosted }: MessageFormProps) {
  const user = useUser();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;

    try {
      setLoading(true);
      setError(null);

      await createMessage(
        message.trim(),
        user.id,
        user.displayName || 'User',
        user.profileImageUrl || undefined,
        (await user.getAuthJson())?.accessToken || undefined
      );

      setMessage('');
      if (onMessagePosted) {
        onMessagePosted({
          id: `temp-${Date.now()}`,
          content: message.trim(),
          author_name: user.displayName || 'User',
          author_image_url: user.profileImageUrl,
          created_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to post message');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <UserAvatar />
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {user.displayName || 'User'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
} 