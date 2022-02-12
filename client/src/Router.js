import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Verification from './pages/Verification';

// 모든 라우트는 이 파일에 작성
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
