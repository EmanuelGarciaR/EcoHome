import type { Request, Response, NextFunction } from "express";
import { type AnyZodObject, type ZodError, ZodSchema } from "zod";

interface ValidationSchemas {
  body?: ZodSchema;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

/**
 * Generic Zod validation middleware factory.
 * Validates request body, params, and/or query against provided schemas.
 * Replaces raw values with parsed (coerced/transformed) data.
 */
export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Array<{ location: string; issues: ZodError["issues"] }> = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.push({ location: "body", issues: result.error.issues });
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.push({ location: "params", issues: result.error.issues });
      } else {
        req.params = result.data as typeof req.params;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.push({ location: "query", issues: result.error.issues });
      } else {
        req.query = result.data as typeof req.query;
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: {
          message: "Validation failed",
          code: "VALIDATION_ERROR",
          details: errors.map((e) => ({
            location: e.location,
            issues: e.issues.map((i) => ({
              path: i.path.join("."),
              message: i.message,
            })),
          })),
        },
      });
      return;
    }

    next();
  };
}
