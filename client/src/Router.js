import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './component/Header/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import Mypage from './pages/Mypage/Mypage';
import Verification from './pages/Verification/Verification';
import VerifyRedir from './pages/Verification/VerifyRedir';
import SignUpGiver from './pages/SignUp/SignUpGiver';
import SignUpHelper from './pages/SignUp/SignUpHelper';
import Gifticon from './pages/Gifticon/Gifticon';
import Google from './pages/SocialLogin/Google';
import KaKao from './pages/SocialLogin/Kakao';
import HelperList from './pages/HelperList/HelperList';
import GifticonDetail from './pages/Gifticon/GifticonDetail';
import HelperDetail from './pages/HelperList/HelperDetail';
import DM from './pages/DM/DM';
import { next } from './pages/SignIn/SignIn';
import { useSelector } from 'react-redux';

// 모든 라우트는 이 파일에 작성
const Router = () => {
  const {
    user: { isLoggedIn },
    user: {
      user: { who },
    },
    page: { prev },
  } = useSelector((state) => state);

  const next = () => {
    if (who === 1) {
      if (prev.includes('/verif')) {
        return '/helperlist/category/0?page=1&limit=9';
      } else {
        return prev;
      }
    } else {
      return 'mypage';
    }
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/signup/giver"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUpGiver />}
        />
        <Route
          path="/signup/helper"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUpHelper />}
        />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to={next()} /> : <SignIn />}
        />
        <Route
          path="/mypage"
          element={isLoggedIn ? <Mypage /> : <Navigate to="/signin" />}
        />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verifyRedir/:type/:id/:code" element={<VerifyRedir />} />
        <Route
          path="/gifticon"
          element={isLoggedIn ? <Gifticon /> : <Navigate to="/signin" />}
        />
        <Route
          path="/gifticon/detail/:id"
          element={isLoggedIn ? <GifticonDetail /> : <Navigate to="/signin" />}
        />
        <Route path="/google/signin" element={<Google />} />
        <Route path="/kakao/signin" element={<KaKao />} />
        <Route path="/helperlist/category/:id" element={<HelperList />} />
        <Route path="/helperlist/detail/:id" element={<HelperDetail />} />
        <Route
          path="/dm"
          element={isLoggedIn ? <DM /> : <Navigate to="/signin" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
