import { queryRangeFromSheet } from "./Sheets";

// export const getAllUsers = () => getRangeFromSheet<{id: string, email: string}[]>("USERS!A2:B", ["id", "email"]);;

export const getAllUsers = () => queryRangeFromSheet("USERS!A:B", "select *")