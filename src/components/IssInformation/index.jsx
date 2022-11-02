import React, {useEffect, useState} from 'react';
import Map from "../Map";
import {useJsApiLoader} from "@react-google-maps/api";
import {getPeopleInSpaceReq, getSpaceStationLocationReq} from "../../api/spaceApi";
import './index.scss'
import useIsFirstRender from "../../hooks/useFirstRender";

const IssInformation = () => {
    const [spaceStationPosition, setSpaceStationPosition] = useState({});
    const isFirst = useIsFirstRender()
    const [people, setPeople] = useState([]);
    const [fullDate, setFullDate] = useState(null);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const handleSpaceInfo = async () => {
        try {
            const {iss_position} = await getSpaceStationLocationReq();
            const {people} = await getPeopleInSpaceReq();
            const currentPeopleInIss = people.filter(({craft}) => craft === 'ISS');
            const date = new Date().toUTCString();

            setFullDate(date);
            setPeople(currentPeopleInIss);
            setSpaceStationPosition(iss_position);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let spaceInfoInterval;
        isFirst ? handleSpaceInfo() : spaceInfoInterval = setInterval(handleSpaceInfo, 5000);

        return () => clearInterval(spaceInfoInterval);
    }, [isFirst])

    return (
        spaceStationPosition?.longitude && isLoaded ?
            <section className='iss-info'>
                <div className='iss-info__left'>
                    <div className='iss-info__locate'>
                        <h2>ISS is now located at:</h2>
                        <p>{`longitude: ${spaceStationPosition.longitude}, latitude: ${spaceStationPosition.latitude}`}</p>
                    </div>
                    <div className='iss-info__map'>
                        <Map spaceStationPosition={spaceStationPosition}/>
                    </div>
                </div>
                <div className='iss-info__right'>
                    <div className='iss-info__date'>
                        <p>{`Current UTC time: ${fullDate.substring(17, 22)}`}</p>
                        <p>{fullDate.substring(0, 16)}</p>
                    </div>
                    <div className='iss-info__people'>
                        <ul className='iss-info__list-of-people'>
                            {people.map((item) => {
                                return <li className='iss-info__list-item' key={item.name}>{item.name}</li>
                            })}
                        </ul>
                        <p className='iss-info__amount-of-people'>
                            {` Total amount: ${people.length} people on ISS`}
                        </p>
                    </div>
                </div>
            </section>
            : <div className='loading'>
                <span>Loading...</span>
            </div>
    );
}

export default IssInformation;