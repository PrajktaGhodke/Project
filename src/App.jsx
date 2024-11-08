import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/App-layout";
import LandingPage from "./pages/landing";
import Onbording from "./pages/onbording"; // Ensure spelling is consistent
import JobListing from "./pages/job-list";
import JobPage from "./pages/job";
import PostJob from "./pages/post-job";
import SavedJobs from "./pages/saved-job";
import MyJobs from "./pages/my-jobs";
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "@/components/theme-provider"; // Ensure the path is correct

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onbording", // Ensure spelling is consistent
        element: (
          <ProtectedRoute>
            <Onbording />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id", // Fixed path with colon
        element: (
          <ProtectedRoute>
            <JobPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
