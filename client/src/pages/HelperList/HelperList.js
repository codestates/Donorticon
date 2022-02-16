import styled from 'styled-components';
import CardList from '../../component/CardList';

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
      <CardList />
    </HelperContainer>
  );
};

export default HelperList;
