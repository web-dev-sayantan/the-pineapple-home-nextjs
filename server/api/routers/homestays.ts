import { procedure, router } from "../trpc";

export const homestaysRouter = router({
  getAllHomestays: procedure.query(({ ctx }) => {
    return {
      homestays: ctx.prisma.homestay.findMany(),
    };
  }),
});
