import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Messages from "../models/messagesModel";
import Conversation from "../models/conversationModel";

import { IReqAuth } from "../config/interface";

const createMessages = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const { sender, recipient, text, media, call } = req.body;
      if (!recipient || (text === "" && media === "" && !call)) return;
      const newConversation = await Conversation.findOneAndUpdate(
        {
          $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] },
          ],
        },
        {
          recipients: [sender, recipient],
          isRead: false,
          lastMessages: text,
        },
        { new: true }
      );
      const newMessage = new Messages({
        conversation: newConversation!._id,
        sender,
        call,
        recipient,
        text,
        media,
      });

      await (
        await newMessage.save()
      ).populate("recipient sender", "avatar username fullname");

      res.json(newMessage);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getMessages = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const messages = await Messages.find({
        conversation: req.params.id,
      })
        .sort("-createdAt")
        .populate("recipient sender", "avatar username fullname");
      res.json(messages);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
const deleteMessages = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const deleteMessages = await Messages.findOneAndDelete({
        _id: req.params.id,
        sender: req.user!._id,
      });
      res.json(deleteMessages);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

export { createMessages, getMessages, deleteMessages };
