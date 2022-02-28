import { Container, Title, Counter } from '../../styles/Landing/Cases';
import { useState, useEffect } from 'react'; 

const Cases = () => {

  const maxScroll = document.body.scrollHeight;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <Title>Countless Givers have donated</Title>
      <Title>through Donorticon</Title>
      <Title>+</Title>
      {maxScroll * 3/5 < scrollPosition ? <Counter></Counter> : null}
      <Title>Gifticons</Title>
    </Container>
  );
};

export default Cases;
