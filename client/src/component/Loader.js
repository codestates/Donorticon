import { Box1, Box2, Box3, Box4, LoaderContainer } from '../styles/LoaderStyle';

const Loader = () => {
  return (
    <LoaderContainer>
      <div>
        <Box1 />
        <Box2 />
      </div>
      <div>
        <Box3 />
        <Box4 />
      </div>
    </LoaderContainer>
  );
};

export default Loader;
