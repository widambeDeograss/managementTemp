import { Navigate, Route, Routes } from "react-router-dom";
import ApplicationsPage from "../page/applications/ApplicationsPage";
import { useAppSelector } from "../store/store-hooks";
import HomePage from "../page/HomePage";
import Application from "../page/applications/Application";
import UsersPage from "../page/user/UsersPage";
import Register from "../page/authentication/Register";
import Login from "../page/authentication/Login";

const Contents = () => {
    const isUserAuhenticated = useAppSelector((state) => state.AppStateReduder.isUserAuthenticated);
    return(
        <div>
           {isUserAuhenticated ? 
           <Routes>
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/application" element={<Application />} />
                <Route path="*" element={<Navigate to="/home" replace/>}/>
            </Routes>: 
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
            }
        </div>
    )   
}

export default Contents;