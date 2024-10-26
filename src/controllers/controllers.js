const { Visitor } = require('../../models.js');



async function incrementVisitorCount(req, res) {
  try {
    let visitorData = await Visitor.findOne(); // Changed to findOne for better checking
    console.log(visitorData);

    if (!visitorData) {
      visitorData = new Visitor({ count: 0 }); // Initialize with default count
    }

    visitorData.count += 1;
    await visitorData.save();

    res.status(200).json({ count: visitorData.count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    res.status(500).json({ error: "Failed to update visitor count" });
  }
}

module.exports = { incrementVisitorCount };
