import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import LoadingScreen from "../components/ui/LoadingScreen.tsx";
import RootLayout from "../components/ui/layouts/RootLayouts.tsx";

// Helper function to delay imports safely
function withDelay(
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
  delay = 1500,
): () => Promise<{ default: React.ComponentType<any> }> {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        importFn().then(resolve);
      }, delay);
    });
}

// Lazy load components with delay
const Landingpage = lazy(
  withDelay(() => import("../pages/nigeria-landing.tsx")),
);
const Form = lazy(withDelay(() => import("../pages/foi-form.tsx")));

const router = createBrowserRouter([
  {
    element: <RootLayout />, // ✅ router context exists here
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Landingpage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.FORM,
        element: (
          <Suspense>
            <Form />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
