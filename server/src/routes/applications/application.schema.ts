import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    projectName:  z.string().min(3, "Project name too short"),
    sector:       z.string().min(1, "Sector required"),
    district:     z.string().min(1, "District required"),
    state:        z.string().default("Chhattisgarh"),
    lat:          z.number().optional(),
    lng:          z.number().optional(),
    areaHa:       z.number().positive("Area must be positive").optional(),
    description:  z.string().optional(),
    feeAmount:    z.number().positive().optional(),
  }),
});

export const updateApplicationSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    projectName:  z.string().min(3).optional(),
    sector:       z.string().optional(),
    district:     z.string().optional(),
    lat:          z.number().optional(),
    lng:          z.number().optional(),
    areaHa:       z.number().positive().optional(),
    description:  z.string().optional(),
    feeAmount:    z.number().positive().optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid("Invalid application ID") }),
});

export type CreateApplicationInput =
  z.infer<typeof createApplicationSchema>["body"];
export type UpdateApplicationInput =
  z.infer<typeof updateApplicationSchema>["body"];