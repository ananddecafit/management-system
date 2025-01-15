import { insertDataToPage, queryDataFromRange } from "../db/Sheets";
import { v4 as uuidv4 } from 'uuid';

const PAGE_NAME = "CLIENTS";
const SHEET_RANGE = `${PAGE_NAME}!A:B`;

export const getAllClients = () => queryDataFromRange(SHEET_RANGE, "select *");

export const checkIdClientExists = () => {};

export const insertClient = (name: string) => { 
    return queryDataFromRange(SHEET_RANGE, `select * where B = '${name}'`)
    .then((res) => {
        if (res && res.length > 0) throw new Error(`Client ${name} already exists`);
    })
    .then(() => insertDataToPage(PAGE_NAME, {
        values: [[uuidv4(), name]]
    }));
};