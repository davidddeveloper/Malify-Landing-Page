import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  image: String,
  hashedPassword: String, // Only present for email/password users
  googleId: String, // Only present for Google users
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

console.log("User model loaded:", User);

export default User;