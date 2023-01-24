import { createComment } from "common/api";

const fetchInfo = async (comment) => {
  const response = await createComment(comment);
  return response;
};

export default async function handler(req, res) {
  const { comment } = JSON.parse(req.body);
  try {
    const result = await fetchInfo(comment);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
