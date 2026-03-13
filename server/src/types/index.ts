import { Request } from "express";

export type Role = "ADMIN" | "PROPONENT" | "SCRUTINY" | "MOM_TEAM";

export interface JwtPayload {
  userId: string;
  email:  string;
  role:   Role;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export type AppStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_SCRUTINY"
  | "EDS"
  | "REFERRED"
  | "MOM_GENERATED"
  | "FINALIZED";