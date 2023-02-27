import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./components/alert/Loading";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import PrivateRouter from "./PrivateRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Profile = lazy(() => import("./pages/Profile"));
const Messages = lazy(() => import("./pages/Messages"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AuthLayout></AuthLayout>}>
              <Route path="signup" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<MainLayout></MainLayout>}>
              <Route
                index
                element={
                  <PrivateRouter>
                    <Home />
                  </PrivateRouter>
                }
              />
              <Route path="/:username" element={<Profile />} />
              <Route path=":id" element={<Explore />} />

              <Route path="/direct/inbox" element={<Messages />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
