import { useEffect, useState } from 'react';
import { MapContainer, NoInfoBox } from '../../styles/utils/Map';

const Mapping = ({ address, detail }) => {
  const [isThere, setIsThere] = useState(true);
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();

  const mapLoader = (x, y) => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(y, x),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(y, x),
    });

    marker.setMap(map);
  };

  const callback = (result, status) => {
    if (result.length === 0) {
      setIsThere(false);
    }
    if (status === kakao.maps.services.Status.OK) {
      const { x, y } = result[0];
      mapLoader(x, y);
    }
  };

  const getGeo = async () => {
    await geocoder.addressSearch(address, callback);
  };

  useEffect(() => getGeo(), []);

  return (
    <>
      {isThere ? (
        <MapContainer detail={detail} id="map" />
      ) : (
        <NoInfoBox>활동 지역 정보가 없어요 🥲</NoInfoBox>
      )}
    </>
  );
};

export default Mapping;
