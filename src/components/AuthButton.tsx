'use client';

import { useUser } from "@stackframe/stack";
import { UserAvatar } from "./UserAvatar";

export function AuthButton() {
  const user = useUser();

  if (!user) {
    return (
      <button
        onClick={() => window.location.href = "/handler/signin"}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <UserAvatar />
        <span className="text-sm text-gray-700">
          {user.displayName || 'User'}
        </span>
      </div>
      <button
        onClick={() => user.signOut()}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Sign out
      </button>
    </div>
  );
} 