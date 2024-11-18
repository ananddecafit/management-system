
import knex from "knex";
import knexConfigs from "../../knexfile";

export default knex(knexConfigs["development"]);