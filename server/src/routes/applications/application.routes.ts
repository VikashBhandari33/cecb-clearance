import { Router } from "express";
import {
  createApplication, getApplications, getApplication,
  updateApplication, submitApplication, startScrutiny,
  issueEds, referApplication,
} from "../../controllers/application.controller";
import { requireAuth, requireRole } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import {
  createApplicationSchema, updateApplicationSchema, idParamSchema,
} from "./application.schema";

const router = Router();

// All routes require auth
router.use(requireAuth);

router.post(  "/",         requireRole(["PROPONENT"]),           validate(createApplicationSchema), createApplication);
router.get(   "/",                                               getApplications);
router.get(   "/:id",      validate(idParamSchema),              getApplication);
router.patch( "/:id",      requireRole(["PROPONENT"]),           validate(updateApplicationSchema), updateApplication);
router.post(  "/:id/submit",   requireRole(["PROPONENT"]),       validate(idParamSchema), submitApplication);
router.post(  "/:id/scrutiny", requireRole(["SCRUTINY","ADMIN"]),validate(idParamSchema), startScrutiny);
router.post(  "/:id/eds",      requireRole(["SCRUTINY"]),        validate(idParamSchema), issueEds);
router.post(  "/:id/refer",    requireRole(["SCRUTINY"]),        validate(idParamSchema), referApplication);

export default router;