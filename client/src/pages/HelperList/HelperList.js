import styled from 'styled-components';
import HelperFilter from '../../component/Filtering/HelperFilter';
import { HelperTitle, Title } from '../../styles/utils/Container';

const HelperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HelperList = () => {
  return (
    <HelperContainer>
      <HelperTitle>HELPER</HelperTitle>
      <HelperFilter />
    </HelperContainer>
  );
};

export default HelperList;
