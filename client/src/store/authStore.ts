import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "ADMIN" | "PROPONENT" | "SCRUTINY" | "MOM_TEAM";

interface User {
  id:    string;
  email: string;
  name:  string;
  role:  Role;
}

interface AuthStore {
  user:    User | null;
  token:   string | null;
  setAuth: (user: User, token: string) => void;
  logout:  () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user:    null,
      token:   null,
      setAuth: (user, token) => set({ user, token }),
      logout:  () => set({ user: null, token: null }),
    }),
    { name: "cecb-auth" }
  )
);
```

**`client/.env`**
```
VITE_API_URL=http://localhost:3000