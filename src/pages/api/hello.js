import { currentUser } from "data/user";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
  console.log('REQ', req);

  if (req.method === 'GET') {
    res.status(200).json(currentUser[0])

  } else if (req.method === 'POST') {
    const user = req.body.user;

    currentUser.push(user);
    currentUser.splice(0, 1);

    const loginUser = currentUser[0]

    res.status(200).json(loginUser)

  }

}


