import styled from 'styled-components';
import HelperFilter from '../../component/HelperFilter';

const HelperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HelperList = () => {
  return (
    <HelperContainer>
      <div>HELPER</div>
      <HelperFilter />
    </HelperContainer>
  );
};

export default HelperList;
