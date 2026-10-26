import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { RootLayout } from "./components/RootLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { StreamErrorPage } from "./pages/StreamErrorPage";

const rootRoute = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFoundPage,
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: DashboardPage,
})

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics/$streamId',
  params: {
    parse: (params) => {
      if (!/^[\w-]+$/.test(params.streamId)) {
        throw new Error(`streamId inválido: ${params.streamId}`)
      }
      return { streamId: params.streamId }
    },
    stringify: (params) => ({ streamId: params.streamId }),
  },
  component: AnalyticsPage,
  errorComponent: StreamErrorPage,
})

const routeTree = rootRoute.addChildren([indexRoute, analyticsRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

