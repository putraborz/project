let command = "none";
const API_KEY = "alex";

export default async function handler(req, res) {
  const { query, method, body } = req;

  // GET untuk Roblox (cek perintah)
  if (method === "GET") {
    if (query.key !== API_KEY) return res.status(403).send("Forbidden");
    const temp = command;
    command = "none";
    return res.status(200).send(temp);
  }

  // POST untuk Discord (set perintah)
  if (method === "POST") {
    const content = body?.content?.toLowerCase() || "";

    if (content.includes("/shutdown")) command = "shutdown";
    else if (content.includes("/restart")) command = "restart";

    console.log("Command received:", command);
    return res.status(200).send("OK");
  }

  res.status(405).send("Method not allowed");
}

