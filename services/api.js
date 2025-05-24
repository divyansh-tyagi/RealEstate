import axios from "axios";

const BASE_URL = "https://6831fbdbc3f2222a8cb113cb.mockapi.io";

export const getHomes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/homes`);
    return res.data;
  } catch (e) {
    console.error("Failed to fetch homes", e);
    return [];
  }
};
``;
export const unlockHome = async (homeId) => {
  const url = `https://jsonplaceholder.typicode.com/posts/`;
  const res = await axios({ url, method: "post", data: { action: "unlock" } });
  return res;
};
