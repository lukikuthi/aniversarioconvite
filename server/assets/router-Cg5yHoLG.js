import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const appCss = "/aniversarioconvite/assets/styles-BGcWRL2h.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-primary-foreground",
        children: "Voltar"
      }
    )
  ] }) });
}
function ErrorComponent({
  error,
  reset
}) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Algo deu errado" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3 justify-center", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-primary-foreground",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "rounded-md border px-4 py-2",
          children: "Início"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$1.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter = () => import("./index-BKNDzDuJ.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "18 anos do Lucas"
    }, {
      name: "description",
      content: "Churrasco de aniversário · 06 de junho · Recanto FB"
    }]
  })
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
