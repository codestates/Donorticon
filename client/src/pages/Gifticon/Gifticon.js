import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  setPage,
  setLimit,
  pageSelector
} from '../../redux/page/pageSlice';
import GifticonComponent from '../../component/Gifticon';


const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const Gifticon = () => {
  const dispatch = useDispatch();
  const state = useSelector(pageSelector);
  const [gifticon, setGifticon] = useState([]);  
  const [grade, setGrade] = useState('');

  useEffect( async () => {
    const request = await axios.get(`${process.env.REACT_APP_SERVER}/gifticon?page=${state.page}&limit=${state.limit}`);
    setGifticon(request.data.gifticonList);
    setGrade(request.data.userInfo.grade_id);
  },[])

  return (
    <div>
      <div>Your Grade is.... {grade || 0}!</div>
      {gifticon.map((item, index) => {
        return <GifticonComponent key={index} data={item}/>
      })}
    </div>
  );
};

export default Gifticon;