import axios from "axios";
import { arrayToJson, csvToJson } from "../../utils/ArrayConversions";

const SPREADSHEET_ID = "15DS3prlfbOpvgGXAKMJq-bZjyxBbqF1y7qrki6mVQB4";
const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;
const SHEETS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;

interface SheetsApiResponse {
    result: {
        values: any[][];
    };
}

interface SheetsApiErrorResult {
    error: {
        code: number;
        message: string;
        status: string;
    }
}

export const getRangeFromSheet = <T>(range: string, columns: string[]): Promise<T> => {
    return window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    }).then((res: SheetsApiResponse) => arrayToJson(res.result.values, columns))
    .catch((err: SheetsApiErrorResult) => console.error(err));
  }

export const queryDataFromRange = <T>(range: string, queryString: string) => {
    // https://developers.google.com/chart/interactive/docs/dev/implementing_data_source#request-format
    // https://developers.google.com/chart/interactive/docs/querylanguage
    const csvPath = `${SPREADSHEET_URL}/gviz/tq?tqx=out:csv&range=${range}&headers=1&tq=${queryString}`;
    const requestHeaders = {
        "Authorization": `Bearer ${window.gapi.client.getToken().access_token}`
    };

    return csvToJson(csvPath, requestHeaders) as Promise<T[] | void>;
};

export const insertDataToPage = (range: string, data: { values: any[] }) => {
    const url = `${SHEETS_API_URL}/values/${range}:append?valueInputOption=RAW`;
    const requestHeaders = {
        "Authorization": `Bearer ${window.gapi.client.getToken().access_token}`
    };

    return axios.post(url, data, { headers: requestHeaders });
}

export const deleteDataFromSheet = () => {};

export const updateDataOnSheet = () => {};


// works
// const csvPath = `${SPREADSHEET_URL}/gviz/tq?tqx=out:csv&sheet=${sheetName}&headers=1&tq=${queryString}`;
// const requestHeaders = {
//     "Authorization": `Bearer ${window.gapi.client.getToken().access_token}`
// };
// // axios.get(csvPath, {
// //     headers: requestHeaders
// // }).then((res) => console.log("csv ", res.data));