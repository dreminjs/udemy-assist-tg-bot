import { Axios } from "axios";

export const axios = new Axios({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCourse = async (from: string, to: string) => {
  const url = `https://v6.exchangerate-api.com/v6/4cbc8a5f303336a657facd18/latest/${from}`;
  const data = (await axios.get(url)).data;

  return JSON.parse(data).conversion_rates[to]
};
