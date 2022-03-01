import { Container, Title, Counter } from '../../styles/Landing/Cases';
import { useState, useEffect } from 'react';
import { LandingContainer, TextBox } from '../../styles/Landing/CommonStyle';

const Cases = () => {
  const maxScroll = document.body.scrollHeight;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LandingContainer>
      <TextBox>
        현재까지 수많은 Giver들이 <br />
        Donorticon을 통해 기부하고 있습니다
        <Title>+</Title>
        {(maxScroll * 3) / 5 < scrollPosition ? <Counter></Counter> : null}
        <Title>기프티콘</Title>
      </TextBox>
    </LandingContainer>
  );
};

export default Cases;
