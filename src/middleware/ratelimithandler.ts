import rateLimit from "express-rate-limit";


export const rateLimitHandler = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 600,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 60,
})
