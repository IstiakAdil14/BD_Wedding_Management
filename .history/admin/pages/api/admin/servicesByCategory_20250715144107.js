import dbConnect from "../../../../server/utils/dbConnect";
import Service from "../../../../server/models/Service";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetch all services regardless of enabled status
    const services = await Service.find({}).lean();

    // Group services by category and count
    const groupCounts = services.reduce((acc, service) => {
      const category = service.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Format data for pie chart
    const result = Object.entries(groupCounts).map(([name, value]) => ({
      name,
      value,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching services by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
