import styled from 'styled-components';

export const ContentLeft = styled.div`
  width: 70%;
`;

export const ContentRight = styled.div`
  width: 30%;
`;

export const InputBox = styled.div`
  padding: 10px 0;
  text-align: left;
`;

export const InputName = styled.div`
  font-size: 13px;
  text-align: left;
`;

export const InputContent = styled.div`
  width: 80%;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
`;

export const InputChanger = styled.input`
  all: unset;
  width: 80%;
  padding: 10px 0;
  margin: 10px 0;
  width: 80%;
  border-bottom: 1px solid ${({ theme }) => theme.color.main};
`;

export const MultiContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const GalleryBox = styled.div`
  width: 20%;
  height: 100px;
  margin: 10px 0;
`;

export const GalleryImg = styled.img`
  height: 100px;
`;

export const ProfileImg = styled.img`
  width: 70%;
  border-radius: 50%;
`;

export const GalleryAddLabel = styled.label`
  width: 100%;
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

export const ActButton = styled.button`
  color: ${({ theme }) => theme.color.lightGrey};
  margin: 5px;
  cursor: pointer;
`;
