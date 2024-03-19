import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    // Allow signed out users to access the specified routes:
    // publicRoutes: ['/anyone-can-visit-this-route'],
    // Prevent the specified routes from accessing
    // authentication information:
    // ignoredRoutes: ['/no-auth-in-this-route'],
    publicRoutes: ['/']
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        // Re-include any files in the api or trpc folders that might have an extension
        "/(api|trpc)(.*)",
    ],
};
