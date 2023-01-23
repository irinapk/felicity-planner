import { getPosts } from "common/api";

const fetchInfo = async () => {
  const response = await getPosts();
  return response;
};

export default async function handler(req, res) {
  try {
    const result = await fetchInfo();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
