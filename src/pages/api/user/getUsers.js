import { getUsers } from "common/api";
import handler from "middleware/_defaultHandler";

export default handler.post(async (req, res) => {
  try {
    const { response, result } = await getUsers();
    return res.status(response.status).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
