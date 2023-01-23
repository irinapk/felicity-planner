import { createPost } from "common/api";

const fetchInfo = async (post) => {
  const response = await createPost(post);
  return response;
};

export default async function handler(req, res) {
  const { post } = JSON.parse(req.body);
  try {
    const result = await fetchInfo(post);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
