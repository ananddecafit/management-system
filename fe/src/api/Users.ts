import { queryRangeFromSheet, getRangeFromSheet } from "./Sheets";

export const getAllUsers = () => getRangeFromSheet<{id: string, email: string}[]>("USERS!A2:B", ["id", "email"]);;

export const getAllUsersViaCsv = () => queryRangeFromSheet("USERS!A:B", "select *")