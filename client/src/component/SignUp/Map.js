import { useEffect } from 'react';
import { MapContainer } from '../../styles/utils/Map';
import { useState } from 'react';

const Mapping = ({ address }) => {
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
    if (status === kakao.maps.services.Status.OK) {
      const { x, y } = result[0];
      mapLoader(x, y);
    }
  };

  useEffect(async () => {
    await geocoder.addressSearch(address, callback);
  }, []);

  return <MapContainer id="map" />;
};

export default Mapping;
