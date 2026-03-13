import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function writeAuditEvent({
  eventType,
  actorId,
  applicationId,
  payload,
}: {
  eventType:     string;
  actorId:       string;
  applicationId?: string;
  payload:       Record<string, any>;
}) {
  // Get last chain hash
  const last = await prisma.auditChain.findFirst({
    orderBy: { id: "desc" },
    select:  { chainHash: true },
  });

  const prevHash    = last?.chainHash ?? "GENESIS";
  const payloadStr  = JSON.stringify(payload);
  const payloadHash = crypto
    .createHash("sha3-256")
    .update(payloadStr)
    .digest("hex");
  const chainHash = crypto
    .createHash("sha3-256")
    .update(prevHash + payloadHash)
    .digest("hex");

  await prisma.auditChain.create({
    data: {
      eventType,
      actorId,
      applicationId,
      payload,
      payloadHash,
      prevHash,
      chainHash,
    },
  });
}