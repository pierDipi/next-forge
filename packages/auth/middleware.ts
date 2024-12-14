import 'server-only';
import {MiddlewareFactory} from "@repo/next-config/middleware";
import {NextFetchEvent, NextRequest} from "next/server";
import {auth} from "./index";

export {auth as authMiddleware} from './';

export const withAuth: MiddlewareFactory = (next) => {
  return async(request: NextRequest, _next: NextFetchEvent) => {
    const a = auth()
    const r = next(request, _next)
    await a
    return r
  }
}
