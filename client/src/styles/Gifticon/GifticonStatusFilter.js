import styled from 'styled-components';
import {
  GifticonCategoryContainer,
  GifticonContent,
} from '../HelperFilter/GifticonCategoryStyle';

export const FilterContainer = styled(GifticonCategoryContainer)``;

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
`;

export const Filtered = styled(GifticonContent)`
  margin-right: 20px;
  white-space: nowrap;
  @media ${({ theme }) => theme.device.tablet} {
    margin-right: 10px;
  }
`;
