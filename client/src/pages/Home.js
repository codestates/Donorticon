import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Banner from '../component/Landing/Banner';
import HowToUse from '../component/Landing/HowToUse';
import Helpers from '../component/Landing/Helpers';
import Reviews from '../component/Landing/Reviews';
import Cases from '../component/Landing/Cases';
import FloatingButton from '../component/Landing/FloatingButton';

const Container = styled.div`
  margin-top: -75px; // 이 값은 HEADER 값과 동일해야함!!
`;

const Wrapper = styled.div``;

const Div = styled.div`
  font-size: 5rem;
`;

const Home = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Div>
            <Banner />
          </Div>
          <Div>
            <HowToUse />
          </Div>
          <Div>
            <Helpers />
          </Div>
          <Div>
            <Reviews />
          </Div>
          <Div>
            <Cases />
          </Div>
        </Wrapper>
        <FloatingButton />
      </Container>
    </>
  );
};

export default Home;
