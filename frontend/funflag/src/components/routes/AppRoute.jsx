import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemoryGame from "../MemoryGame/MemoryGame";
import AIFun from "../AIFun/AIFun";
import HomePage from "../HomePage/HomePage";
import NotFound from "../NotFound/NotFound";


const AppRoute = () => {

    return (

        <>
            <Router>
                <Routes>
                    <Route path="/memory-game" element={<MemoryGame />} />
                    <Route path="/ai-fun-game" element={<AIFun />} />
                    <Route path="/" element={<HomePage />} />

                    <Route path="*" element={ <NotFound />} /> {/* Fallback for unmatched routes */}

                </Routes>

            </Router>
        </>
    );
}


export default AppRoute;