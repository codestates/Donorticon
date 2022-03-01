import styled from 'styled-components';
import Banner from '../component/Landing/Banner';
import HowToUse from '../component/Landing/HowToUse';

import Reviews from '../component/Landing/Reviews';
import Cases from '../component/Landing/Cases';
import FloatingButton from '../component/Landing/FloatingButton';

const Container = styled.div`
  margin-top: -75px; // 이 값은 HEADER 값과 동일해야함!!
`;

const Home = () => {
  return (
    <Container>
      <Banner />
      <HowToUse />
      <Reviews />
      <Cases />
      <FloatingButton />
    </Container>
  );
};

export default Home;
