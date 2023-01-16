import { deleteUser } from "common/api";
import handler from "middleware/_defaultHandler";

export default handler.post(async (req, res) => {
  const { id } = req.body;

  try {
    const { response, result } = await deleteUser(id);
    return res.status(response.status).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
