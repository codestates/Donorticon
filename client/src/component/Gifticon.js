import styled from 'styled-components';

const GifticonImg = styled.img`
  src: ${(props) => props.src};
  width: 24rem;
  height: 15rem;
`;

const GifticonContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const GifticonComponent = ({ data }) => {
  console.log(data);
  const { createdAt, giver_id, helper_id, id, img, report, status, updatedAt } =
    data;

  return (
    <GifticonContainer>
      <GifticonImg src={img} />
      <br />
      Sent to: {helper_id}
      <br />
      Sent at: {createdAt}
      <br />
      Status: {status}
    </GifticonContainer>
  );
};

export default GifticonComponent;
