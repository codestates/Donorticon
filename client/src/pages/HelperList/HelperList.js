import styled from 'styled-components';
import HelperFilter from '../../component/HelperFilter';
import { Title } from '../../styles/utils/Container';

const HelperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HelperList = () => {
  return (
    <HelperContainer>
      <Title style={{ paddingBottom: '40px' }}>HELPER</Title>
      <HelperFilter />
    </HelperContainer>
  );
};

export default HelperList;
