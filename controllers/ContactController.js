import Contact from "../models/ContactModel.js";

const contactForm = async (req, res) => {
  try {
    const constactDetails = await Contact(req.body);
    await constactDetails.save();
    res.status(200).send({
      success: true,
      message: "Message send Successfully",
      constactDetails,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Message not delivered", error });
  }
};

export { contactForm };
