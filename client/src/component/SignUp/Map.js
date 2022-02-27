import { useEffect } from 'react';
import { MapContainer } from '../../styles/utils/Map';
import { useState } from 'react';

const Mapping = ({ address }) => {
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();

  const mapLoader = (x, y) => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(y, x),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
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
