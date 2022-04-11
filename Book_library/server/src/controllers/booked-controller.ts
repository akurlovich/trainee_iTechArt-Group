import { NextFunction, Request, Response } from "express";
import bookedService from "../service/booked-service";
import Logger from "../logger/log";
import userService from "../service/user-service";
import bookService from "../service/book-service";

class BookedController {
  async addBooked(req: Request, res: Response, next: NextFunction) {
    try {
      const newBooked = await bookedService.addBooked(req.body);
      const book = await bookService.getBookByID(newBooked.bookID.toString())
      const user = await userService.getUserByID(newBooked.userID.toString())
      Logger.info(`Booking book ${book.title} by User ${user.email}`, { action: 'booking', book: book.title, user: user.email});
      return res.json(newBooked);
    } catch (error) {
      next(error);
    }
  };

  async getAllBookedsBookID(req: Request<{ id: string}>, res: Response, next: NextFunction) {
    try {
      const booked = await bookedService.getAllBookedsBookID(req.params.id);
      return res.json(booked);
    } catch (error) {
      next(error);
    }
  };

  async getAllBookedsUserID(req: Request<{ id: string}>, res: Response, next: NextFunction) {
    try {
      const booked = await bookedService.getAllBookedsUserID(req.params.id);
      return res.json(booked);
    } catch (error) {
      next(error);
    }
  };

  async getBookedByID(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const booked = await bookedService.getBookedByID(req.params.id);
      return res.json(booked);
    } catch (error) {
      next(error);
    }
  };

  async getAllBookeds(req: Request, res: Response, next: NextFunction) {
    try {
      const bookeds = await bookedService.getAllBookeds();

      return res.json(bookeds);
    } catch (error) {
      next(error);
    }
  };

  async deleteBooked(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const booked = await bookedService.deleteBooked(req.params.id);
      const book = await bookService.getBookByID(booked.bookID.toString())
      const user = await userService.getUserByID(booked.userID.toString())
      Logger.info(`Cansel booking book ${book.title} by User ${user.email}`, { action: 'cansel booking', book: book.title, user: user.email});
      return res.json(booked);
    } catch (error) {
      next(error);
    }
  };
};

export default new BookedController;