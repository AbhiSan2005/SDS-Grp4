import Member from "../models/member.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";

const bufferToDataURI = (fileFormat, buffer) => {
    return `data:${fileFormat};base64,${buffer.toString("base64")}`;
};

export const getMembers = async (req, res) => {
    try {
        const members = await Member.find().select(
            "name role portfolio batch contactNumber email photo socials expertise branch joinedDate"
        );
        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ message: "Failed to fetch members." });
    }
};

export const createMember = async (req, res) => {
  console.log("Request body:", req.body);
    try {
        let photoUrl = "";

        if (req.file) {
            const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: "sds_members",
            });
            photoUrl = result.secure_url;
        }

        const memberData = {
            ...req.body,
            photo: photoUrl,
        };

        if (memberData.socials && typeof memberData.socials === "string") {
            try {
                memberData.socials = JSON.parse(memberData.socials);
            } catch (parseError) {
                console.error("Failed to parse socials JSON:", parseError);
                return res.status(400).json({ message: "Invalid socials data format." });
            }
        } else if (!memberData.socials) {
             memberData.socials = {};
        }

        if (memberData.expertise && typeof memberData.expertise === "string") {
            memberData.expertise = memberData.expertise
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        } else {
            memberData.expertise = [];
        }

        const existingMember = await Member.findOne({ email: memberData.email?.toLowerCase() });
        if (existingMember) {
            return res.status(400).json({ message: "Email already exists." });
        }

        if (memberData.role === "Admin" || memberData.role === 'Faculty Advisor') {
            if (!memberData.password || memberData.password.length < 6) {
                return res.status(400).json({ message: "Password is required (min 6 characters) for Admin/Faculty roles." });
            }
            const salt = await bcrypt.genSalt(10);
            memberData.password = await bcrypt.hash(memberData.password, salt);
        } else {
            delete memberData.password;
        }

        const newMember = new Member(memberData);
        await newMember.save();

        const memberResponse = newMember.toObject();
        delete memberResponse.password;

        res.status(201).json(memberResponse);

    } catch (error) {
        console.error("Error creating member:", error);
        if (error.name === 'ValidationError') {
             return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Failed to create member due to server error." });
    }
};

export const getMemberbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findById(id).select("-password");
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(member);
    } catch (error) {
        console.error("Error fetching member by ID:", error);
         if (error.name === 'CastError') {
             return res.status(400).json({ message: "Invalid member ID format." });
        }
        res.status(500).json({ message: "Failed to fetch member." });
    }
};

export const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        let photoUrl = req.body.photoUrl || '';

        if (req.file) {
            const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: "sds_members",
            });
            photoUrl = result.secure_url;
        }
        updateData.photo = photoUrl;

         if (updateData.socials && typeof updateData.socials === "string") {
            try {
                updateData.socials = JSON.parse(updateData.socials);
            } catch (parseError) {
                 return res.status(400).json({ message: "Invalid socials data format." });
            }
        } else if (!updateData.socials) {
             updateData.socials = {};
        }

        if (updateData.expertise && typeof updateData.expertise === "string") {
            updateData.expertise = updateData.expertise
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        } else if (updateData.expertise === undefined) {
             delete updateData.expertise;
        } else {
            updateData.expertise = [];
        }

        if ((updateData.role === "Admin" || updateData.role === 'Faculty Advisor') && updateData.password) {
             if (updateData.password.length < 6) {
                 return res.status(400).json({ message: "New password must be at least 6 characters." });
            }
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        } else {
            delete updateData.password;
        }

        const updatedMember = await Member.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        const memberResponse = updatedMember.toObject();
        delete memberResponse.password;

        res.status(200).json(memberResponse);

    } catch (error) {
        console.error("Error updating member:", error);
         if (error.name === 'ValidationError') {
             return res.status(400).json({ message: error.message });
        }
         if (error.name === 'CastError') {
             return res.status(400).json({ message: "Invalid member ID format." });
        }
        res.status(500).json({ message: "Failed to update member." });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member deleted successfully." });
    } catch (error) {
        console.error("Error deleting member:", error);
         if (error.name === 'CastError') {
             return res.status(400).json({ message: "Invalid member ID format." });
        }
        res.status(500).json({ message: "Failed to delete member." });
    }
};