'use client';

import { useUser } from "@stackframe/stack";

export function UserAvatar() {
  const user = useUser();

  if (!user) {
    return null;
  }

  if (user.profileImageUrl) {
    return (
      <img
        src={user.profileImageUrl}
        alt={user.displayName || 'User avatar'}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }

  const initials = user.displayName?.[0]?.toUpperCase() || '?';

  return (
    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
      <span className="text-white text-sm font-bold">
        {initials}
      </span>
    </div>
  );
} 