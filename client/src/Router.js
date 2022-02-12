import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import SignUpHelper from './pages/SignUpHelper';
import SignUpGiver from './pages/SignUpGiver';
import Verification from './pages/Verification';

// 모든 라우트는 이 파일에 작성
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup/giver" element={<SignUpGiver />} />
        <Route path="/signup/helper" element={<SignUpHelper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
