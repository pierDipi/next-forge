'use client';

import type {User} from 'next-auth';
import {useState} from 'react';
import {currentUser} from './index';

export function useUser() {
  const [user, setUser] = useState<User | undefined>(undefined);
  currentUser().then((u) => setUser(u));
  return user;
}
