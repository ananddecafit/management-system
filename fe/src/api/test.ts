import axios from "axios";

export const getTestData = () => {
    return axios.get(`http://localhost:${process.env.REACT_APP_API_PORT}/test`);
};