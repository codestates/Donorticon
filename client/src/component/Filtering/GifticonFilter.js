import {
  Status,
  StatusBox,
  StatusContainer,
} from '../../styles/Gifticon/GifticonStatusFilter';

export const gifticonStatus = [
  { id: 0, name: '전체', eng: 'all' },
  { id: 1, name: '사용함', eng: 'used' },
  { id: 2, name: '수락함', eng: 'accpeted' },
  { id: 3, name: '확인중', eng: 'checking' },
  { id: 4, name: '거절됨', eng: 'rejected' },
  { id: 5, name: '만료됨', eng: 'expired' },
];

const GiticonFilter = ({ statusId, handleStatusClick }) => {
  return (
    <StatusContainer>
      <StatusBox>
        {gifticonStatus.map((category, idx) => {
          const name = category.name;
          const id = category.id;
          return (
            <Status
              key={idx}
              className={`${statusId === id && 'active'}`}
              onClick={() => handleStatusClick(name)}
            >
              {category.name}
            </Status>
          );
        })}
      </StatusBox>
    </StatusContainer>
  );
};

export default GiticonFilter;
