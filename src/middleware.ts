import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(fr|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
