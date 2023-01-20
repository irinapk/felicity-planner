import { createTask } from "common/api";

const fetchInfo = async (task) => {
  const response = await createTask(task);
  return response;
};

export default async function handler(req, res) {
  const { task } = JSON.parse(req.body);
  try {
    const result = await fetchInfo(task);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
