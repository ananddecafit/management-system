import axios from "axios";

export const getTestData = () => {
    return axios.get(`${process.env.REACT_APP_API_PATH}/test`);
};