import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { linksRouter } from "./routers/links";
import { urlsRouter } from './routers/urls';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  links: linksRouter,
  urls: urlsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
