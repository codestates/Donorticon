import { useEffect, useState } from 'react';
import bronze from '../img/pointGrade/0_bronze.png';
import silver from '../img/pointGrade/1_silver.png';
import gold from '../img/pointGrade/2_gold.png';
import platinum from '../img/pointGrade/3_platinum.png';
import diamond from '../img/pointGrade/4_diamond.png';
import {
  LevelContainer,
  LevelContents,
  LevelImage,
  LevelName,
} from '../styles/Gifticon/GifticonStyle';
import { Title } from '../styles/utils/Container';

const pointGrade = [
  { id: 0, name: '브론즈 연탄', src: bronze },
  { id: 1, name: '실버 연탄', src: silver },
  { id: 2, name: '골드 연탄', src: gold },
  { id: 3, name: '플래티넘 연탄', src: platinum },
  { id: 4, name: '다이아몬드 연탄', src: diamond },
];

const GiverLevel = ({ point }) => {
  const [grade, setGrade] = useState({});

  const getGrade = () => {
    if (point <= 5) {
      setGrade(pointGrade[0]);
    } else if (point > 5 && point <= 10) {
      setGrade(pointGrade[1]);
    } else if (point > 10 && point <= 15) {
      setGrade(pointGrade[2]);
    } else if (point > 15 && point <= 20) {
      setGrade(pointGrade[3]);
    } else {
      setGrade(pointGrade[4]);
    }
  };

  useEffect(() => getGrade(), []);

  return (
    <>
      <LevelContainer>
        <Title>GIVER</Title>
      </LevelContainer>
      <LevelContents>
        <LevelImage src={grade.src} />
        <LevelName>{grade.name}</LevelName>
      </LevelContents>
    </>
  );
};

export default GiverLevel;
