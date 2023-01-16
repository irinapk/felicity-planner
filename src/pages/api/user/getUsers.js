import { getUsers } from "common/api";
import handler from "middleware/_defaultHandler";

export default handler.post(async (req, res) => {
  //   const { id, name } = req.body;

  //   const errors = getFormErrors(id, name);
  //   if (errors.length > 0) {
  //     return res.status(400).json({ error: errors });
  //   }

  // Create new user with HarperDB, and send back result
  try {
    const { response, result } = await getUsers();
    return res.status(response.status).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
