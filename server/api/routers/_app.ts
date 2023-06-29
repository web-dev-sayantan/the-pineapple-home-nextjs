import { procedure, router } from "../trpc";

export const appRouter = router({
  getAllHomestays: procedure.query((opts) => {
    return {
      test: true,
    };
  }),
});

export type AppRouter = typeof appRouter;
