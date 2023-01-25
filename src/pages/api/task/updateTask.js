import { updateTask } from "common/api";

const fetchInfo = async (data) => {
  const response = await updateTask(data);
  return response;
};

export default async function handler(req, res) {
  const { data } = JSON.parse(req.body);
  try {
    const result = await fetchInfo(data);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
