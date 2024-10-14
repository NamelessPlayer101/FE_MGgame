import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Menu from "./components/Layout/Menu";
import Chat from "./containers/Chat";
import Page404 from "./containers/Page404";

function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/game" element={<Menu />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default MyRoutes;
