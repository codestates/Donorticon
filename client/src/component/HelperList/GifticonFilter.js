import { useRef, useState } from 'react';
import {
  FilterBox,
  FilterContainer,
  Filtered,
  Scroll,
} from '../../styles/Gifticon/GifticonStatusFilter';

export const gifticonStatus = [
  { id: 0, name: '전체' },
  { id: 1, name: '사용함' },
  { id: 2, name: '수락함' },
  { id: 3, name: '확인중' },
  { id: 4, name: '거절됨' },
  { id: 5, name: '만료됨' },
  { id: 6, name: '신고됨' },
];

const GiticonFilter = ({ statusId, handleStatusClick }) => {
  const scroll = useRef();

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const handleDragStart = (e) => {
    // console.log(e.pageX);
    // console.log(scroll.current.scrollLeft);
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scroll.current.scrollLeft);
  };
  return (
    <FilterContainer>
      <FilterBox>
        <Scroll>
          {gifticonStatus.map((category, idx) => {
            const name = category.name;
            const id = category.id;
            return (
              <Filtered
                key={idx}
                className={`${statusId === id && 'active'}`}
                onClick={() => handleStatusClick(name)}
                ref={scroll}
                onMouseMove={handleDragStart}
              >
                {category.name}
              </Filtered>
            );
          })}
        </Scroll>
      </FilterBox>
    </FilterContainer>
  );
};

export default GiticonFilter;
