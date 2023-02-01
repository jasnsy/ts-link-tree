import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const linksRouter = createTRPCRouter({
  getLinks: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          displayName: input.name,
        },
      });
    }),
});
