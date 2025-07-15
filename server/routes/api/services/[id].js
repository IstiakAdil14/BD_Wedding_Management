const dbConnect = require('../../../utils/dbConnect');
const Service = require('../../../models/Service');

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const service = await Service.findById(id);
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
