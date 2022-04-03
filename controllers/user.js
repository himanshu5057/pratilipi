import express from "express";
import mongoose from "mongoose";
import UserModel from "../model/user.js";
import axios from "axios";
export const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    let user = await UserModel.create({
      name: name,
      email: email,
      phone: phone,
    });
    if (user) {
      await axios.post("updateUserInSeries", { userId: user._id });
      return res.status(200).json({
        success: true,
        result: "User created successfully",
      });
    } else {
      return res.json({
        success: false,
        result: "Error occured. Please try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      result: error,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        success: true,
        result: user,
      });
    } else {
      return res.json({
        success: false,
        result: "Error Occurred",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      result: error,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find({});
    if (users) {
      return res.status(200).json({
        success: true,
        result: users,
      });
    } else {
      return res.json({
        success: false,
        result: "Error Occurred",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      result: error,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndDelete(req.params.id);
    if (user) {
      return res.status(200).json({
        success: true,
        result: "User deleted successfully",
      });
    } else {
      return res.json({
        success: false,
        result: "Error Occurred",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      result: error,
    });
  }
};

export const unlockOneChapter = async (req, res) => {
  try {
    let {data} = await axios.post("updateUnlockedChapters", {
      seriesId: req.body.seriesId,
      userId: req.body.userId,
    });
    // console.log(data);
    if (data.success == true)
      return res.json({
        success: true,
        result:data.result
      });
    else{
      return res.json({
        success: false,
        result:"failed"
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      result: error,
    });
  }
};
