import { AppStatus } from "@prisma/client";
import { AppError } from "../middleware/errorHandler";

// Define valid transitions
const TRANSITIONS: Record<AppStatus, AppStatus[]> = {
  DRAFT:          ["SUBMITTED"],
  SUBMITTED:      ["UNDER_SCRUTINY"],
  UNDER_SCRUTINY: ["EDS", "REFERRED"],
  EDS:            ["UNDER_SCRUTINY"],
  REFERRED:       ["MOM_GENERATED"],
  MOM_GENERATED:  ["FINALIZED"],
  FINALIZED:      [],
};

export function assertTransition(from: AppStatus, to: AppStatus) {
  const allowed = TRANSITIONS[from];
  if (!allowed.includes(to)) {
    throw new AppError(
      `Invalid transition: ${from} → ${to}. Allowed: ${allowed.join(", ") || "none"}`,
      400
    );
  }
}

export function getNextStatus(current: AppStatus): AppStatus | null {
  const next = TRANSITIONS[current];
  return next.length === 1 ? next[0] : null;
}