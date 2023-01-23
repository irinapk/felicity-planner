import { addPostLike } from "common/api";

const fetchInfo = async (id, likes) => {
  const response = await addPostLike(id, likes);
  return response;
};

export default async function handler(req, res) {
  const { id, likes } = JSON.parse(req.body);
  try {
    const result = await fetchInfo(id, likes);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
