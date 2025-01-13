import { arrayToJson } from "../utils/ArrayConversions";

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

export const getRangeFromSheet = <T>(range: string, columns: string[]): Promise<T> => {
    return window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    }).then((res: SheetsApiResponse) => arrayToJson(res.result.values, columns))
    .catch((err: SheetsApiErrorResult) => console.error(err));
  }