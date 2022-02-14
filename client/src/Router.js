import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import Mypage from './pages/Mypage';
import Verification from './pages/Verification/Verification';
import VerifyRedir from './pages/Verification/VerifyRedir';
import SignUpGiver from './pages/SignUp/SignUpGiver';
import SignUpHelper from './pages/SignUp/SignUpHelper';

// 모든 라우트는 이 파일에 작성
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup/giver" element={<SignUpGiver />} />
        <Route path="/signup/helper" element={<SignUpHelper />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verifyRedir/:type/:id/:code" element={<VerifyRedir />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
