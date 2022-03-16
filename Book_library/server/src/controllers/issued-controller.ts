import { NextFunction, Request, Response } from "express";
import { NOTIFICATION_TIME } from "../constants";
import issuedService from "../service/issued-service";
import mailService from "../service/mail-service";
import schedule from 'node-schedule';
import bookService from "../service/book-service";
import userService from "../service/user-service";
import Logger from "../logger/log";

class IssuedController {
  async addIssued(req: Request, res: Response, next: NextFunction) {
    try {
      const newIssued = await issuedService.addIssued(req.body);
      // const date = new Date(Date.now() + NOTIFICATION_TIME);
      // const job = schedule.scheduleJob(date, async function() {
      //   const issued = await issuedService.getIssuedByID(newIssued.id);
      //   if (issued) {
      //     const book = await bookService.getBookByID(newIssued.bookID.toString())
      //     const user = await userService.getUserByID(newIssued.userID.toString())
      //     await mailService.sendNotificationToMail(user.email, book.title);
      //   } else {
      //     return
      //   }
      // });
      const book = await bookService.getBookByID(newIssued.bookID.toString());
      const user = await userService.getUserByID(newIssued.userID.toString());
      Logger.info(`Issued book ${book.title} by User ${user.email}`, { action: 'issued', book: book.title, user: user.email});
      return res.json(newIssued);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  async getAllIssuedsBookID(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const issued = await issuedService.getAllIssuedsBookID(req.params.id);
      return res.json(issued);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  async getAllIssuedsUserID(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const issued = await issuedService.getAllIssuedsUserID(req.params.id);
      return res.json(issued);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  async getIssuedByID(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const issued = await issuedService.getIssuedByID(req.params.id);
      return res.json(issued);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  async getAllIssueds(req: Request, res: Response, next: NextFunction) {
    try {
      const issueds = await issuedService.getAllIssueds();
      return res.json(issueds);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  async deleteIssued(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const issued = await issuedService.deleteIssued(req.params.id);
      return res.json(issued);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

export default new IssuedController;