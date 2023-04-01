import QRCode from 'qrcode';

//It takes a long URL and returns a shortened URL
const getShortenedURL = async (longURL) => {
  /* Creating a new URL object. */
  const url = new URL('https://t.ly/api/v1/link/shorten');

  /* Setting the api_token to the value of the SHORTER_API_KEY environment variable. */
  const params = {
    api_token: process.env.SHORTER_API_KEY,
  };

  /* Adding the api_token to the URL. */
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  /* Setting the headers of the request. */
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  /* Converting the data to JSON format. */
  const setData = JSON.stringify({
    long_url: longURL,
    domain: 'https://t.ly/',
    include_qr_code: false,
  });

  return fetch(url, {
    method: 'POST',
    headers,
    body: setData,
  }).then((response) => response.json());
};

//It takes a token and an id, and returns a QR code
const generateQR = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }

  const { token, id, room } = req.body;

  const url = `${process.env.FRONTEND_URL}/tempauth/${id}/${room}/${token}`;

  const shortenedURL = await getShortenedURL(url);

  try {
    const qrImage = await QRCode.toDataURL(shortenedURL?.short_url);

    res.send({
      status: 'OK',
      data: { qrImage, linkURL: shortenedURL?.short_url },
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default generateQR;
