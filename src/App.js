import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewNotice from "./component/NewNotice";
import Notice from "./component/main/Notice";
import Err404 from "./Err/Err404";
import styled from "./App.module.css";

function App() {
  return (
    <div className={styled.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notice />} />
          <Route path="/notice/new" element={<NewNotice />} />
          <Route path="/notice/correction/:productId" element={<NewNotice />} />
          <Route path="/notice/:noticeId" element={<NewNotice />} />
          <Route path="*" element={<Err404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
