import dbConnect from "../../../../server/utils/dbConnect";
import ContactMessage from "../../../../server/models/ContactMessage";
import Testimonial from "../../../../server/models/Testimonial";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetch recent 2 ContactMessages sorted by sentAt descending
    const recentMessages = await ContactMessage.find({})
      .sort({ sentAt: -1 })
      .limit(2)
      .lean();

    // Fetch recent 2 Testimonials sorted by createdAt descending (timestamps)
    const recentTestimonials = await Testimonial.find({ display: true })
      .sort({ createdAt: -1 })
      .limit(2)
      .lean();

    // Map messages to unified format
    const mappedMessages = recentMessages.map((msg) => ({
      id: `msg-${msg._id}`,
      type: "Message",
      title: `Inquiry from ${msg.name}`,
      date: msg.sentAt ? msg.sentAt.toISOString().split("T")[0] : "",
    }));

    // Map testimonials to unified format
    const mappedTestimonials = recentTestimonials.map((test) => ({
      id: `test-${test._id}`,
      type: "Testimonial",
      title: `Feedback from ${test.clientName}`,
      date: test.createdAt ? test.createdAt.toISOString().split("T")[0] : "",
    }));

    // Combine and sort by date descending
    const combined = [...mappedMessages, ...mappedTestimonials].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json(combined);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
