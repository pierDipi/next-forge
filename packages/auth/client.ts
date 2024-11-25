'use client';

import type {User} from 'next-auth';
import {useState} from 'react';
import {getSession} from "next-auth/react";

export function useUser() {
  const [user, setUser] = useState<User | undefined>(undefined);
  currentUser().then((u) => setUser(u));
  return user;
}

export async function currentUser() {
  const s = await currentUserSession();
  return s?.user;
}

export async function currentUserSession() {
  return getSession();
}
