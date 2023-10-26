import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./pages/AuthForm/Login";
import DashboardComponent from "./pages/Dashboard";
import NotFoundComponent from "./pages/404";
//  import LayoutComponent from "./pages/Layout";
import Protected from "./router/ProtectedRoute";
 import {TopNavComponent} from "./components/TopNavComponent";
import SignUpComponent from "./pages/AuthForm/SignUp";
import { useSelector } from 'react-redux';
import RedirectRoute from "./router/PrivateRoute";
import { Navigate } from "react-router-dom";

export default function App() {
  const { user } = useSelector((store) => store.user);
    const id = user.id;
    const sessionClientToken = JSON.parse(window.sessionStorage.getItem('JWT')) ;
    const localclientToken = JSON.parse(window.localStorage.getItem('JWT'));

    const clientToken = sessionClientToken ? sessionClientToken : localclientToken;

    console.log('from app', id);
  return (
    <BrowserRouter>
       <TopNavComponent/> 
      <Routes>
          <Route  path="/" element={
                  clientToken 
                  ? <Navigate to="/user/profile" replace={true} />
                  : <Navigate to="/user/login" replace={true} />
                } />

          <Route path="/user/login"  
            element={
                  <RedirectRoute clientToken={clientToken} path={'/user/profile'}>
                    <LoginComponent />
                  </RedirectRoute>
                  } 
            />

          <Route path="/user/signup" 
                element={
                  <RedirectRoute clientToken={clientToken} path={'/user/profile'}>
                <SignUpComponent />
                </RedirectRoute>
              } 
            />
          <Route index  path="/user/profile"
                    element={
                        <Protected clientToken={clientToken}>
                            <DashboardComponent />
                        </Protected>
                    }/>

            <Route path="*" element={<NotFoundComponent codeError="404" />} />
       </Routes>
    </BrowserRouter>
    
    
  );
}


