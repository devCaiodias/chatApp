import User from "../models/users.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const fillteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    
    req.status(200).json(fillteredUsers)
  } catch (error) {
    console.log("Error in getUsersSidebar controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const message = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(message)
        
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image} = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        res.status(200).json({
            message: "Message sent successfully",
            newMessage
        })
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}