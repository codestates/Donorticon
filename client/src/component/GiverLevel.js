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

const pointGrade = [
  { id: 0, name: '브론즈 연탄', src: bronze },
  { id: 1, name: '실버 연탄', src: silver },
  { id: 2, name: '골드 연탄', src: gold },
  { id: 3, name: '플래티넘 연탄', src: platinum },
  { id: 4, name: '다이아몬드 연탄', src: diamond },
];

const GiverLevel = ({ grade }) => {
  const [level, setLevel] = useState();
  console.log('grade', grade);
  console.log('first', level);

  const getLevel = (grade) => {
    if (grade !== 0) {
      const filtered = pointGrade.filter((x) => x.id === grade);
      setLevel(filtered[0]);
      console.log('second', level);
    } else {
      setLevel({ id: 0, name: '브론즈 연탄', src: bronze });
    }
  };

  useEffect(() => getLevel(grade), [grade]);

  return (
    <>
      <LevelContainer>
        <Title>GIVER</Title>
      </LevelContainer>
      {level && (
        <LevelContents>
          <LevelImage src={level.src} />
          <LevelName>{level.name}</LevelName>
        </LevelContents>
      )}
      {grade === undefined && (
        <LevelContents>
          <LevelImage src={bronze} />
          <LevelName>브론즈 연탄</LevelName>
        </LevelContents>
      )}
    </>
  );
};

export default GiverLevel;
