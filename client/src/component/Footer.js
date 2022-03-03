import { FaGithub } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';
import {
  Comment,
  Content,
  ContentContainer,
  FooterContainer,
  IconContainer,
  MemberGithub,
  MemberName,
  MemberPoition,
  Title,
} from '../styles/FooterStyle';

const Footer = () => {
  return (
    <FooterContainer>
      <Title>About Us</Title>
      <IconContainer>
        <a
          href="https://github.com/codestates/Donorticon"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaGithub size="24" />
        </a>
        <a
          href="https://www.notion.so/5-K2H2-Donorticon-c44e3d4bedfb4e8a8d02ea5278572a52"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiNotion size="24" />
        </a>
      </IconContainer>
      <ContentContainer>
        <Content>
          <MemberName>김 수 영</MemberName>
          <MemberPoition>Full-Stack</MemberPoition>
          <a
            href="https://github.com/seanswim"
            target="_blank"
            rel="noreferrer noopener"
          >
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
        <Content>
          <MemberName>황 지 수</MemberName>
          <MemberPoition>Full-Stack</MemberPoition>
          <a
            href="https://github.com/tiatiahwang"
            target="_blank"
            rel="noreferrer noopener"
          >
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
        <Content>
          <MemberName>허 진 혁</MemberName>
          <MemberPoition>Front-End</MemberPoition>
          <a
            href="https://github.com/Jin-hyeok2"
            target="_blank"
            rel="noreferrer noopener"
          >
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
        <Content>
          <MemberName>김 호 민</MemberName>
          <MemberPoition>Back-End</MemberPoition>
          <a
            href="http://github.com/Mubarmig"
            target="_blank"
            rel="noreferrer noopener"
          >
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
      </ContentContainer>
      <Comment>Copyright @ 2022 Donorticon</Comment>
    </FooterContainer>
  );
};

export default Footer;
