import { useEffect, useState } from 'react';
import { LandingContainer, TextBox } from '../../styles/Landing/CommonStyle';
import { SlideBox } from '../../styles/Landing/HelpersStyle';

const HelperImages = [
  {
    id: 0,
    src: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 1,
    src: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 2,
    src: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 3,
    src: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 4,
    src: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 5,
    src: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: 6,
    src: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    id: 7,
    src: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    id: 8,
    src: 'https://randomuser.me/api/portraits/women/9.jpg',
  },
  {
    id: 9,
    src: `https://randomuser.me/api/portraits/women/10.jpg`,
  },
];

const Helpers = () => {
  const [isReady, SetIsReady] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >= 1180) {
      SetIsReady(true);
    } else {
      SetIsReady(false);
    }
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
        많은 Helper들이 Donorticon과
        <br />
        함께 하고 있습니다
      </TextBox>
      <SlideBox isReady={isReady}>
        {HelperImages.map((image) => (
          <img src={image.src} alt={image.id} key={image.id} />
        ))}
      </SlideBox>
    </LandingContainer>
  );
};

export default Helpers;
