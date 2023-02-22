import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./Pages/NotesListPage";
import NotePage from "./Pages/NotePages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </BrowserRouter>
      </div>
      ,
    </div>
  );
}

export default App;
