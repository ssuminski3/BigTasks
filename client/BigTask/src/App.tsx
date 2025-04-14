import { Routes, Route } from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage.tsx'
import CreateBigTask from './pages/CreateBigTask.tsx';
import CreateSprint from './pages/CreateSprint.tsx';
import ShowBigTask from './pages/ShowBigTask.tsx';
import ShowSprint from './pages/ShowSprint.tsx';
import NotFound from './pages/NotFound.tsx';
import LandingPage from "./pages/LandingPage.tsx";
import ProtectedRoutes from './auth/ProtectedRoutes.tsx'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<MainPage />} />
                <Route path="/createbigtask" element={<CreateBigTask />} />
                <Route path="/createsprint" element={<CreateSprint />} />
                <Route path="/showbigtask" element={<ShowBigTask />} />
                <Route path="/showsprint" element={<ShowSprint />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
