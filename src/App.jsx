import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from "./main/AppRoutes";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}

export default App;

