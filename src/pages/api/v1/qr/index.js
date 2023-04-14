import QRCode from "qrcode";

//This function creates a short URL using a random string and saves it to a Supabase database.
const createShortLink = async (longURL) => {
  const shortUrl = Math.random().toString(36).substr(2, 6);

  try {
    await fetch("https://lwcehdpteppgotsedvhm.supabase.co/rest/v1/cut_url", {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longURL, short_url: shortUrl }),
    }).then(({ data }) => data);
  } catch (error) {
    throw error;
  }
};

//The function retrieves a short URL from a Supabase database based on a given long URL.
const getShortLink = async (longURL) => {
  try {
    const shortLink = await fetch(
      `https://lwcehdpteppgotsedvhm.supabase.co/rest/v1/cut_url?url=eq.${longURL}&select=short_url`,
      {
        method: "GET",
        headers: {
          apikey: process.env.SUPABASE_API_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => result);

    return shortLink[0]?.short_url;
  } catch (error) {
    throw error;
  }
};

//It takes a token and an id, and returns a QR code
const generateQR = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .send({ status: "FAILED", data: { error: "Method not allowed" } });
  }

  const { token, id, room } = req.body;

  const url = `${process.env.FRONTEND_URL}/tempauth/${id}/${room}/${token}`;

  try {
    await createShortLink(url);
    const shortLink = await getShortLink(url);

    const qrImage = await QRCode.toDataURL(
      `${process.env.FRONTEND_URL}/shorturl/${shortLink}`
    );

    res.status(201).send({
      status: "OK",
      data: {
        qrImage,
        linkURL: `${process.env.FRONTEND_URL}/shorturl/${shortLink}`,
      },
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default generateQR;
