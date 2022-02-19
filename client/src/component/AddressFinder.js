import styled from 'styled-components';
import DaumPostCode from 'react-daum-postcode';
import { useState } from 'react';

const Box = styled.div`
  display: flex;
  direction: row;
  padding-bottom: 10px;
`;
const Guider = styled.div``;
const EditButton = styled.button`
  margin-left: auto;
  color: ${({ theme }) => theme.color.mainDark};
  cursor: pointer;
`;
const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.progressBar};
  background-color: none;
  &:focus {
    outline-color: ${({ theme }) => theme.color.main};
  }
`;

const AddressFinder = ({ callback, location }) => {
  const [complete, setComplete] = useState(location === '' ? false : true);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      callback(fullAddress);
      setComplete(true);
    }
  };

  return complete ? (
    <>
      <Box>
        <Guider>활동 지역</Guider>
        <EditButton onClick={() => setComplete(false)}>수정</EditButton>
      </Box>
      <Input readOnly defaultValue={location} />
    </>
  ) : (
    <DaumPostCode onComplete={handleComplete} className="post-code" />
  );
  // const [zipcode, adress, detail] = location.split('+');
  // const { daum } = window;
  // const findAddr = () => {
  //   new daum.Postcode({
  //     oncomplete: function (data) {
  //       // console.log(data);

  //       // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
  //       // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
  //       // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
  //       var roadAddr = data.roadAddress; // 도로명 주소 변수
  //       var jibunAddr = data.jibunAddress; // 지번 주소 변수
  //       // 우편번호와 주소 정보를 해당 필드에 넣는다.
  //       document.getElementById('member_post').value = data.zonecode;
  //       if (roadAddr !== '') {
  //         document.getElementById('member_addr').value = roadAddr;
  //         callback(`${data.zonecode}+${roadAddr}`);
  //       } else if (jibunAddr !== '') {
  //         document.getElementById('member_addr').value = jibunAddr;
  //         callback(`${data.zonecode}+${jibunAddr}`);
  //       }
  //     },
  //   }).open();
  // };

  // const handleDetail = (e) => {
  //   if (detail !== e.target.value) {
  //     callback(location + `+${e.target.value}`);
  //   }
  // };

  // return (
  //   <>
  //     <AdressContainer
  //       id="member_post"
  //       type={'text'}
  //       placeholder="Zip code"
  //       defaultValue={zipcode ? zipcode : ''}
  //       readOnly
  //       onClick={findAddr}
  //     />
  //     <AdressContainer
  //       id="member_addr"
  //       type={'text'}
  //       placeholder="Address"
  //       defaultValue={adress ? adress : ''}
  //       readOnly
  //     />
  //     <AdressContainer
  //       type={'text'}
  //       placeholder="detail adress"
  //       defaultValue={detail ? detail : ''}
  //       onBlur={handleDetail}
  //     />
  //   </>
  // );
};

export default AddressFinder;
