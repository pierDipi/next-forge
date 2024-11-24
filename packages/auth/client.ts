"use client";

import {useState} from "react";
import {User} from "next-auth";
import {currentUser} from "./index";

export function useUser() {
    const [user, setUser] = useState<User | undefined>(undefined);
    currentUser().then((u) => setUser(u))
    return user
}
