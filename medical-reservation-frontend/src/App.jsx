
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="*" element={<Navigate to="/login" />} />
//             </Routes>
//         </Router>
//     );
// }

export default App;