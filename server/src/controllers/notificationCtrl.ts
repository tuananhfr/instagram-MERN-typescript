import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Notify from "../models/notificationModel";
import { IReqAuth } from "../config/interface";

const createNotify = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const { id, recipients, images, url, content } = req.body;

      const filteredRecipients = recipients.filter(
        (recipientId: string) => recipientId !== req.user!._id.toString()
      );

      const notify = new Notify({
        id,
        recipients: filteredRecipients,
        images,
        url,
        content,
        user: req.user!._id,
      });

      await (
        await notify.populate("user", "avatar username following followers")
      ).save();
      res.json(notify);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getNotify = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const notifies = await Notify.find({
        recipients: { $in: [req.user!._id] },
      })
        .sort("-createdAt")
        .populate("user", "avatar username following followers");

      res.json(notifies);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const deleteNotify = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const notifies = await Notify.findOneAndDelete({
        id: req.params.id,
      })
        .sort("-createdAt")
        .populate("user", "avatar username following followers");

      res.json(notifies);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const isReadNotify = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const notifies = await Notify.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isRead: true },
        { new: true }
      ).populate("user", "avatar username following followers");

      res.json(notifies);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
export { createNotify, getNotify, deleteNotify, isReadNotify };
