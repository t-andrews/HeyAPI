import "reflect-metadata";
import mockDb from "mock-knex";
import { PostgresClient } from "../src/db/PostgresClient";

const knex = PostgresClient.initObjection();

before( () => {
    console.log('Global setup');
    mockDb.mock(knex);
});

after(() => {
    console.log('Global teardown');
    mockDb.unmock(knex);
});
