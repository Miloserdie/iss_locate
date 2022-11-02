import React from 'react';
import {GoogleMap, MarkerF} from "@react-google-maps/api";
import './index.scss';
import CustomMarker from '../../assets/img/ISSIcon.png'

const Map = ({spaceStationPosition}) => {
    const position = {
        lat: +spaceStationPosition.latitude || 1,
        lng: +spaceStationPosition.longitude || 1
    };

    return (
        <GoogleMap
            center={position}
            zoom={3}
            mapContainerClassName={`google-map-container`}
        >
            <MarkerF key={+spaceStationPosition.latitude} position={position} options={{icon: CustomMarker}}/>
        </GoogleMap>
    )

};

export default Map;