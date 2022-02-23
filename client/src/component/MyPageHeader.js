import { useSelector } from 'react-redux';
import { Container, SubContainer, Title } from '../styles/utils/Container';

const MyPageHeader = () => {
  const who = useSelector((state) => state.user.user.who);
  const name = useSelector((state) => state.user.user.name);
  return (
    <Container>
      <SubContainer>
        <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
        {name}님 반가워요!
      </SubContainer>
    </Container>
  );
};
export default MyPageHeader;
