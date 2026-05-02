import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ExercisesPage from "./pages/ExercisesPage";
import HistoryPage from "./pages/HistoryPage";
import NewSessionPage from "./pages/NewSessionPage";
import NotFoundPage from "./pages/NotFoundPage";
import RMPage from "./pages/RMPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/sessions/new" element={<NewSessionPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/rm" element={<RMPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
