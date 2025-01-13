import * as dfd from 'danfojs';

const SPREADSHEET_ID = "15DS3prlfbOpvgGXAKMJq-bZjyxBbqF1y7qrki6mVQB4";

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

const arrayToJson = (arr: any[], columns: string[]) => {
    const tf = dfd.tensorflow;
    let tensor_arr = tf.tensor2d(arr);
    let df = new dfd.DataFrame(tensor_arr, {columns})
    return dfd.toJSON(df);
};

export const getRangeFromSheet = <T>(range: string, columns: string[]): Promise<T> => {
    return window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    }).then((res: SheetsApiResponse) => arrayToJson(res.result.values, columns))
    .catch((err: SheetsApiErrorResult) => console.error(err));
  }