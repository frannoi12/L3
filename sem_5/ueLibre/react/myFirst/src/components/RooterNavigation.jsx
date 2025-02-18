import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Acceuil from './Acceuil';
import Apropos from './Apropos';

function RooterNavigation() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Acceuil />} />
                <Route path='/about' element={<Apropos />} />
            </Routes>
        </Router>
    );
}

export default RooterNavigation