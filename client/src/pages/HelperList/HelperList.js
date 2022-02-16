import List from '../../component/HelperList';

import styled from 'styled-components';

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
      <div>first filtering</div>
      <div>second filtering</div>
      <List />
      <div>pagination</div>
    </HelperContainer>
  );
};

export default HelperList;
