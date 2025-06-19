import dotenv from "dotenv";
dotenv.config();

interface ConfigData {
  portNumber: number;
}

export const config: ConfigData = {
  portNumber: Number(process.env.PORTNUMBER ?? 4000),
};
