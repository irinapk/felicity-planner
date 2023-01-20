import { deleteTask } from "common/api";

const fetchInfo = async (id) => {
  const response = await deleteTask(id);
  return response;
};

export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  try {
    const result = await fetchInfo(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
