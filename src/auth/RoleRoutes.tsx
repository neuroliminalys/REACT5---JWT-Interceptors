import { hasEveryRoles, hasSomeRole } from "./auth.service";

interface RoleRoutesProps {
    children: React.ReactNode
    authorizedRoles: string | string[]
    protectionMode: "EVERY_ROLES" | "SOME_ROLES"
}

export default function RoleRoute({children, authorizedRoles, protectionMode}: RoleRoutesProps) {
    if (
        protectionMode === "EVERY_ROLES" ? hasEveryRoles(authorizedRoles) : hasSomeRole(authorizedRoles)
      ) {
        return children;
      } else {
        return <p>Forbidden</p>;
      }
}