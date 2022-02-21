import {
  LevelContainer,
  LevelContents,
  LevelImage,
  LevelName,
} from '../styles/Gifticon/GifticonStyle';
import { Title } from '../styles/utils/Container';
import bronze from '../img/pointGrade/0_bronze.png';
import silver from '../img/pointGrade/1_silver.png';
import gold from '../img/pointGrade/2_gold.png';
import platinum from '../img/pointGrade/3_platinum.png';
import diamond from '../img/pointGrade/4_diamond.png';
import { useEffect, useState } from 'react';

const GiverLevel = ({ point }) => {
  const [level, setLevel] = useState('');

  const getLevel = (point) => {
    if (point !== 0) {
      if (point >= 21) {
        setLevel({ id: 4, name: '다이아몬드 연탄', src: diamond });
      } else if (point >= 16) {
        setLevel({ id: 3, name: '플래티넘 연탄', src: platinum });
      } else if (point >= 11) {
        setLevel({ id: 2, name: '골드 연탄', src: gold });
      } else if (point >= 6) {
        setLevel({ id: 1, name: '실버 연탄', src: silver });
      } else if (point >= 0) {
        setLevel({ id: 0, name: '브론즈 연탄', src: bronze });
      }
    } else {
      setLevel({ id: 0, name: '브론즈 연탄', src: bronze });
    }
  };

  useEffect(() => getLevel(point), [point]);

  return (
    <>
      <LevelContainer>
        <Title>GIVER</Title>
      </LevelContainer>
      {level && point && (
        <LevelContents>
          <LevelImage src={level.src} />
          <LevelName>{level.name}</LevelName>
        </LevelContents>
      )}
      {/* {point === 0 && (
        <LevelContents>
          <LevelImage src={bronze} />
          <LevelName>브론즈 연탄</LevelName>
        </LevelContents>
      )} */}
    </>
  );
};

export default GiverLevel;
