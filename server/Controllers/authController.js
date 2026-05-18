import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const createToken = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
});

export const registerUser = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log(`👤 New user registered: ${user.email}`);
        console.log(`📂 Database: ${User.db.name}`);
        console.log(`📦 Collection: ${User.collection.name}`);

        return res.status(201).json({
            message: "Account created successfully",
            token: createToken(user._id.toString()),
            user: sanitizeUser(user),
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Failed to create account" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            message: "Logged in successfully",
            token: createToken(user._id.toString()),
            user: sanitizeUser(user),
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Failed to log in" });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ message: "Google credential is required" });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        if (!clientId || clientId === "your_google_client_id_here") {
            console.error("Google Auth error: GOOGLE_CLIENT_ID is not configured");
            return res.status(500).json({ message: "Google authentication is not configured on the server" });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        const { sub, email, name, picture } = payload;
        
        if (!email) {
            return res.status(400).json({ message: "Email not provided by Google" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name: name || email.split("@")[0],
                email,
                googleId: sub,
                picture,
            });
            console.log(`👤 New user registered (Google): ${user.email}`);
            console.log(`📂 Database: ${User.db.name}`);
            console.log(`📦 Collection: ${User.collection.name}`);
        } else {
            // Update googleId or picture if not present
            let updated = false;
            if (!user.googleId) {
                user.googleId = sub;
                updated = true;
            }
            if (!user.picture && picture) {
                user.picture = picture;
                updated = true;
            }
            if (updated) await user.save();
        }

        return res.status(200).json({
            message: "Logged in with Google successfully",
            token: createToken(user._id.toString()),
            user: sanitizeUser(user),
        });
    } catch (error) {
        console.error("Google Auth error:", error);
        return res.status(500).json({ message: "Google authentication failed" });
    }
};

export const getCurrentUser = async (req, res) => {
    return res.status(200).json({ user: req.user });
};
