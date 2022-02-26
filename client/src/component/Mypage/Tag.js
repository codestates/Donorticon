import { TagAdder, TagBox, TagContainer } from '../../styles/Mypage/TagStyle';

const Tag = ({ tagList = [], targetTagList = [], callback }) => {
  const handleVulnerable = (e, idx) => {
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
    <TagContainer>
      <TagAdder>
        {tagList.map((tag, idx) => (
          <TagBox
            key={idx}
            boolean={targetTagList.includes(idx + 1)}
            onClick={(e) => handleVulnerable(e, idx)}
          >
            {tag}
          </TagBox>
        ))}
      </TagAdder>
    </TagContainer>
  );
};

export default Tag;
