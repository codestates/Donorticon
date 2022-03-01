import { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import {
  AddressBox,
  AddressContainer,
  AddressEdit,
  AddressInput,
  AddressTitle,
} from '../../styles/AddressFinderStyle';

const AddressFinder = ({ callback, location, mypage }) => {
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
    <AddressContainer mypage={mypage}>
      <AddressBox>
        <AddressTitle mypage={mypage}>활동 지역</AddressTitle>
        <AddressEdit mypage={mypage} onClick={() => setComplete(false)}>
          수정
        </AddressEdit>
      </AddressBox>
      <AddressInput mypage={mypage} readOnly defaultValue={location} />
    </AddressContainer>
  ) : (
    <DaumPostCode onComplete={handleComplete} className="post-code" />
  );
};

export default AddressFinder;
