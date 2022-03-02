import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  margin-top: ${(props) => props.noSpace && '0'};
`;

const ImageBox = styled.img`
  height: 90%;
  &:hover {
    cursor: zoom-out;
  }
`;

const ImageZoom = ({ closer, src }) => {
  const handleClose = () => {
    closer();
  };

  return (
    <Background onClick={handleClose}>
      <ImageBox src={src} />
    </Background>
  );
};

export default ImageZoom;
