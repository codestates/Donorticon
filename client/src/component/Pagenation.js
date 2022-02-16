import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const style = { cursor: 'pointer' };

const Pagenation = ({ maxPage, setCurrentPage }) => {
  const handlePage = (e) => {
    setCurrentPage(e.target.innerText);
  };

  // maxPage가 5보다 큰경우,
  // 5개씩 page 숫자가 보이게끔 설정해야 함

  // page가 5일때 > 버튼을 누르면,
  // page 숫자는 6 7 8 9 10이 보여야함

  return (
    <Container>
      <FaAngleLeft size="20" style={style} />
      <div
        style={{ marginRight: '20px', cursor: 'pointer' }}
        onClick={handlePage}
      >
        1
      </div>
      <div style={{ cursor: 'pointer' }} onClick={handlePage}>
        2
      </div>
      <FaAngleRight size="20" style={style} />
    </Container>
  );
};

export default Pagenation;
