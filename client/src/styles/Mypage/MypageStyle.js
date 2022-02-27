import styled from 'styled-components';

export const ContentLeft = styled.div`
  width: 70%;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const ContentRight = styled.div`
  width: 30%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    padding-bottom: 20px;
  }
`;

export const InputBox = styled.div`
  padding: 10px 0;
  text-align: left;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const InputName = styled.div`
  font-size: 13px;
  text-align: left;
`;

export const InputChanger = styled.input`
  all: unset;
  width: 80%;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.main};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const TextareaChanger = styled.textarea`
  all: unset;
  width: 80%;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.main};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
  height: max-content;
`;

export const InputContent = styled.div`
  width: 80%;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const MultiContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: ${(props) => props.gallery && '80%'};
  align-items: ${(props) => props.center && 'center'};
  @media ${({ theme }) => theme.device.mobile} {
    width: ${(props) => props.gallery && '100%'};
  }
`;

export const GalleryBox = styled.div`
  width: 100%;
  height: 100px;
  margin: 10px 0;
  display: flex;
`;

export const GalleryImg = styled.img`
  width: 20%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  &:hover {
    cursor: pointer;
    position: relative;
    animation: ddd.1s infinite;
    animation-direction: alternate;
  }
  @keyframes ddd {
    from {
      transform: rotate(2deg);
    }
    to {
      transform: rotate(-2deg);
    }
  }
`;

export const ActBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const ActButton = styled.button`
  margin: 10px 0;
  cursor: pointer;
  width: 90px;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const ProfileImg = styled.div`
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  width: 150px;
  height: 150px;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100px;
    height: 100px;
  }
`;

export const GalleryAddLabel = styled.label`
  width: ${(props) => (props.center ? '150px' : '100%')};
  border: 1px solid ${({ theme }) => theme.color.main};
  background-color: #fff;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.main};
  }
`;

export const NotShow = styled.input`
  display: none;
`;

export const ErrorReminder = styled.div`
  display: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  color: ${({ theme }) => theme.color.error};
`;
