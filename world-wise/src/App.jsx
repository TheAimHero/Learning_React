import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import Form from "./components/Form/Form";
import City from "./components/City/City";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/fakeAuthContext";
import ProtectRoute from "./components/ProtectRoute";
import SpinnerFullPage from "./components/utils/SpinnerFullPage/SpinnerFullPage";

const HomePage = lazy(() => import("./pages/HomePage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectRoute>
                    <AppLayout />
                  </ProtectRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}
