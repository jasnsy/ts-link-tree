import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const urlsRouter = createTRPCRouter({
  checkSlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const count = await ctx.prisma.shortUrl.count({
        where: {
          slug: input.slug
        },
      });

      return (count > 0)
    }),
  createSlug: publicProcedure
    .input(z.object({
      slug: z.string(),
      url: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.shortUrl.create({
          data: {
            slug: input.slug,
            url: input.url
          }
        })
      } catch (e) {
        console.log(e)
      }
    }),
    getSlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.shortUrl.findFirst({
        where: {
          slug: input.slug
        },
      });
    }),
});
