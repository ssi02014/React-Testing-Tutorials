import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers); // node
// const server = setupWorker(...handlers); // browser

export default server;
