import {NextFetchEvent, NextRequest} from "next/server";
import {MiddlewareFactory} from "@repo/next-config/middleware";

export const log = console;

export const withLogging: MiddlewareFactory = (next) => {
  return async(request: NextRequest, _next: NextFetchEvent) => {
    log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] Middleware match`)
    return next(request, _next)
  }
}
