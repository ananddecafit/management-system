import { queryDataFromRange } from "../db/Sheets";

const SHEET_RANGE = "USERS!A:B";

// export const getAllUsers = () => getRangeFromSheet<{id: string, email: string}[]>("USERS!A2:B", ["id", "email"]);;

// select * where B contains 'anand'
export const getAllUsers = () => queryDataFromRange(SHEET_RANGE, "select *")