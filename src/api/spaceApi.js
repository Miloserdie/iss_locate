import axios from "axios";

const stationLocationUrl = `http://api.open-notify.org/iss-now.json`;
const peopleInSpaceUrl = 'http://api.open-notify.org/astros.json';

const getSpaceStationLocationReq = async () => {
    const {data} = await axios.get(stationLocationUrl);
    return data;
};

const getPeopleInSpaceReq = async () => {
    const {data} = await axios.get(peopleInSpaceUrl);
    return data;
};

export {getSpaceStationLocationReq, getPeopleInSpaceReq};