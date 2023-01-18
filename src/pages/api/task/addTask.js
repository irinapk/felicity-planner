import { createTask } from "common/api";
import handler from "middleware/_defaultHandler";

export default handler.post(async (req, res) => {
  const { task } = req.body;

  try {
    const { response, result } = await createTask(task);
    return res.status(response.status).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
