// interface Roles {
//   role:
//     | "system"
//     | "admin"
//     | "paidUser"
//     | "authenticated"
//     | "unauthenticated";
// }

const systemOrUpper = ["admin"];
const adminOrUpper = [...systemOrUpper, "admin"];
const paidUserOrUpper = [...adminOrUpper, "paidUser"];
const authenticatedOrUpper = [...paidUserOrUpper, "authenticated"];
const unauthenticatedOrUpper = [...authenticatedOrUpper, "unauthenticated"];

const roleOrUpper: Record<string, string[]> = {
  system: systemOrUpper,
  admin: adminOrUpper,
  paidUser: paidUserOrUpper,
  authenticated: authenticatedOrUpper,
  unauthenticated: unauthenticatedOrUpper,
};

const upperRole: Record<string, string[]> = {
  system: systemOrUpper,
  admin: systemOrUpper,
  paidUser: adminOrUpper,
  authenticated: paidUserOrUpper,
  unauthenticated: authenticatedOrUpper,
};

// 1: allowed
// 0: not allowed
// A role is allowed if it is in the same or higher level than the required role
export const compareRole = ({
  requiredRole,
  userRole,
}: {
  requiredRole: string;
  userRole: string | undefined;
}) => {
  if (requiredRole === "unauthenticated") return 1;

  if (!userRole) return 0;
  const t = roleOrUpper[requiredRole];

  if (t && t.includes(userRole)) return 1;

  return 0;
};

export const onlyUpperRole = ({
  upperThan,
  userRole,
}: {
  upperThan: string;
  userRole: string | undefined;
}) => {
  if (!userRole) return 0;
  const t = upperRole[upperThan];

  if (t && t.includes(userRole)) return 1;

  return 0;
};

type UserRole = {
  role: string | null;
};

export const getHighestRole = (roles: UserRole[], startRole?: string) => {
  let highestRole = startRole ?? "unauthenticated";

  for (const role of roles) {
    if (!role.role) continue;
    if (onlyUpperRole({ upperThan: highestRole, userRole: role.role })) {
      highestRole = role.role;
    }
  }

  return highestRole;
};

