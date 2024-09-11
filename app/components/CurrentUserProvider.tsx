// components/CurrentUserProvider.tsx
import { getCurrentUser } from "@/actions/getCurrentUser"
import { BetterUser } from "../SearchAlternatives/SearchBar2"
import UserMenu from "./nav/UserMenu"

export const dynamic = "force-dynamic"

export default async function CurrentUserProvider() {
  const currentUser: BetterUser | null = await getCurrentUser()
  return <UserMenu currentUser={currentUser} />
}
