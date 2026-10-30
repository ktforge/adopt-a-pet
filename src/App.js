import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PetDetailsPage from "./pages/detail";
import PetDetailsNotFound from "./pages/petDetailsNotFound";
import Root from "./components/root";

// Add react-router-dom imports
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// create router with JSX Route elements
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    // root holds the nav, the child routes show up in its Outlet
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      {/* /dog, /cat, etc. reuse the home page */}
      <Route path=":type" element={<HomePage />} />
      <Route path=":type/:id" element={<PetDetailsPage />} />
      {/* static paths win over :type, so /search doesn't get read as a pet type */}
      <Route path="search" element={<SearchPage />} />
      <Route path="pet-details-not-found" element={<PetDetailsNotFound />} />
    </Route>
  )
);

function App() {
  return (
    // replace below with a Router Provider
    <RouterProvider router={appRouter} />
  );
}

export default App;
