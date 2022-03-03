import styled from 'styled-components';
import {
  GifticonCategoryContainer,
  GifticonContent,
} from '../HelperList/GifticonCategoryStyle';

export const FilterContainer = styled(GifticonCategoryContainer)`
  padding-top: 0;
`;

export const FilterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`;

export const Scroll = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Filtered = styled(GifticonContent)`
  margin-right: 20px;
  white-space: nowrap;
  @media ${({ theme }) => theme.device.tablet} {
    margin-right: 10px;
  }
`;
