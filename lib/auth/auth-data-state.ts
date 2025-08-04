import { AuthState } from "@/lib/auth/auth-state";

export type AuthDataState<T> = AuthState & {
  data: T;
};
