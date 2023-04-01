import QRCode from 'qrcode';

//It takes a token and an id, and returns a QR code
const generateQR = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ status: 'FAILED', data: { error: 'Method not allowed' } });
  }

  const { token, id, room } = req.body;

  const url = `${process.env.FRONTEND_URL}/tempauth/${id}/${room}/${token}`;

  try {
    const result = await QRCode.toDataURL(url);
    res.send({ status: 'OK', data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

export default generateQR;
