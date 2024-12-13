const nodemailer = require('@sendgrid/mail');

const sendReceipt = async (req, res) => {
  const { email, tourName, totalAmount, bookingDate } = req.body;

  if (!email || !tourName || !totalAmount || !bookingDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    nodemailer.setApiKey(process.env.SENDGRID_API_KEY);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Receipt for your booking: ${tourName}`,
      text: `Thank you for booking with us!\n\nTour: ${tourName}\nTotal Amount: $${totalAmount}\nBooking Date: ${new Date(
        bookingDate
      ).toLocaleDateString()}`,
    };

    await nodemailer.send(mailOptions);

    res.status(200).json({ message: 'Receipt sent successfully' });
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error);
    res
      .status(500)
      .json({ message: 'Failed to send receipt', error: error.message });
  }
};

module.exports = {
  sendReceipt,
};
