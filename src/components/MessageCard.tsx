'use client';

import { FC } from 'react';

interface MessageCardProps {
  author: string;
  content: string;
  timestamp: string;
  authorImageUrl?: string;
}

export const MessageCard: FC<MessageCardProps> = ({ author, content, timestamp, authorImageUrl }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start space-x-4 mb-4">
        {authorImageUrl ? (
          <img
            src={authorImageUrl}
            alt={author}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {author[0].toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {author}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {timestamp}
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}; 