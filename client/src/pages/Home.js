import Banner from '../component/Landing/Banner';
import HowToUse from '../component/Landing/HowToUse';
import Helpers from '../component/Landing/Helpers';
import Number from '../component/Landing/Number';
import FloatingButton from '../component/Landing/FloatingButton';
import { HomeContainer } from '../styles/utils/Container';

const Home = () => {
  return (
    <HomeContainer>
      <Banner />
      <HowToUse />
      <Helpers />
      <Number />
      <FloatingButton />
    </HomeContainer>
  );
};

export default Home;
