const User = require('../models/User');

// @route  GET /api/user/dashboard
// @desc   Get user dashboard data (bookings, profile)
// @access Private
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: {
        user,
        bookingsCount: user.bookings.length,
        recentBookings: user.bookings.slice(-5).reverse(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route  POST /api/user/book
// @desc   Book a movie ticket
// @access Private
exports.bookTicket = async (req, res) => {
  try {
    const { movie, seats, pricePerSeat } = req.body;

    if (!movie || !seats || !pricePerSeat) {
      return res.status(400).json({ success: false, message: 'Movie, seats, and price are required' });
    }

    const total = seats * pricePerSeat;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { bookings: { movie, seats, total } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Booking confirmed! 🎉',
      booking: user.bookings[user.bookings.length - 1],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
