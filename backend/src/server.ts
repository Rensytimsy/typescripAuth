import app from "./app.js";
import { config } from "./config/config.js";
//make app listen to a port number inorder to run/start the server
app.listen(config.portNumber, () => {
  console.log(`server running at --> http://localhost:${config.portNumber}`);
});
