import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const TagContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const TagStyle = styled.div`
  margin: 15px;
  padding-top: 5px;
  width: 130px;
  height: 30px;
  border-radius: 15px;
  cursor: ${({ cursor }) => cursor};
  background-color: ${({ theme, boolean }) =>
    boolean ? theme.color.main : theme.color.lightGrey};
  border: solid;
  border-width: thin;
  align-items: center;
  text-align: center;
`;

const CompleteButton = styled.button`
  width: 100px;
  height: 15px;
  padding-top: 1px;
  background-color: ${({ theme }) => theme.color.main};
  border: none;
  border-radius: 8px;
  margin-left: 20px;
  align-items: center;
  text-align: center;
`;

const TagAdder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: solid;
  border-width: 3px;
  width: 70%;
`;

const Tag = ({ tagList = [], targetTagList = [], callback }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClickTag = (e, idx) => {
    if (!targetTagList.includes(idx + 1)) {
      callback.create(idx + 1);
    } else {
      if (targetTagList.length > 1) {
        callback.delete(idx + 1);
      } else {
        console.log('1개 이상은 필수');
      }
    }
  };

  return (
    <Container>
      {isEditMode ? (
        <TagAdder>
          {tagList.map((tag, idx) => (
            <TagStyle
              key={idx}
              boolean={targetTagList.includes(idx + 1)}
              onClick={(e) => handleClickTag(e, idx)}
              cursor="pointer"
            >
              {tag}
            </TagStyle>
          ))}
          <CompleteButton
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            완료
          </CompleteButton>
        </TagAdder>
      ) : (
        <>
          <TagContent
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            {targetTagList.map((tag, idx) => (
              <TagStyle key={idx} boolean={true} cursor="grab">
                {tagList[tag - 1]}
              </TagStyle>
            ))}
          </TagContent>
        </>
      )}
    </Container>
  );
};

export default Tag;
