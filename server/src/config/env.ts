import dotenv from "dotenv";
dotenv.config();

const required = (key: string): string => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing env variable: ${key}`);
  return val;
};

export const env = {
  PORT:             process.env.PORT || "3000",
  DATABASE_URL:     required("DATABASE_URL"),
  REDIS_URL:        process.env.REDIS_URL || "redis://localhost:6379",
  JWT_SECRET:       required("JWT_SECRET"),
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),
  JWT_EXPIRES_IN:   process.env.JWT_EXPIRES_IN || "15m",
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || "7d",
  NODE_ENV:         process.env.NODE_ENV || "development",
  GROQ_API_KEY:     process.env.GROQ_API_KEY || "",
  CLIENT_URL:       process.env.CLIENT_URL || "http://localhost:5173",
};