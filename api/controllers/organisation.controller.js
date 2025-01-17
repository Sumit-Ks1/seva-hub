import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Organisation } from "../models/organisation.model.js";
import { Event } from "../models/event.model.js";

const generateAccessAndRefereshTokens = async (organisationId) => {
  try {
    const organisation = await Organisation.findById(organisationId);
    const accessToken = organisation.generateAccessToken();
    const refreshToken = organisation.generateRefreshToken();

    organisation.refreshToken = refreshToken;
    await organisation.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerOrganisation = asyncHandler(async (req, res) => {

  const { name, email, description, password, started_at } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedOrganisation = await Organisation.findOne({ email });

  if (existedOrganisation) {
    throw new ApiError(409, "organisation with email already exists");
  }
  

  const organisation = await Organisation.create({
    email,
    password,
    name: name,
    description: description,
    started_at: started_at,
  });

  const createdOrganisation = await Organisation.findById(
    organisation._id
  ).select("-password -refreshToken");

  if (!createdOrganisation) {
    throw new ApiError(
      500,
      "Something went wrong while registering the organisation"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdOrganisation,
        "organisation registered Successfully"
      )
    );
});

const loginOrganisation = asyncHandler(async (req, res) => {


  const { email, password } = req.body;

  if (!email) {
    // throw new ApiError(400, "organisationname or email is required")
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "organisationname or email is required"));
  }
  if (!password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "organisationname or email is required"));
  }

  const organisation = await Organisation.findOne({
    email,
  });

  if (!organisation) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "organisation does not exist"));
  }

  const isPasswordValid = await organisation.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid organisation credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    organisation._id
  );

  const loggedInorganisation = await Organisation.findById(
    organisation._id
  ).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          organisation: loggedInorganisation,
          accessToken,
          refreshToken,
        },
        "organisation logged In Successfully"
      )
    );
});

const logoutOrganisation = asyncHandler(async (req, res) => {
  await Organisation.findByIdAndUpdate(
    req.organisation._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "organisation logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const organisation = await organisation.findById(decodedToken?._id);

    if (!organisation) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== organisation?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(organisation._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const organisation = await organisation.findById(req.organisation?._id);
  const isPasswordCorrect = await organisation.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  organisation.password = newPassword;
  await organisation.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentOrganisation = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.organisation,
        "organisation fetched successfully"
      )
    );
});

const addEvent = asyncHandler(async (req, res) => {
  const { name, organizedBy, date, time, location, description } = req.body;

  if (!name || !organizedBy || !location) {
    return res
      .status(400)
      .json(new ApiError(400, {}, "All fields are required"));
  }
  const event = await Event.create({
    name: name.toUpperCase(),
    eventDate: date,
    eventVenue: location,
    eventTime: time,
    description,
    organizedBy: req.organisation._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event added successfully"));
});
const pastEvents = asyncHandler(async (req, res) => {

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the beginning of the day

  const events = await Event.find({
    organizedBy: req.organisation._id,
    eventDate: { $lt: today },
  }).sort({ eventDate: -1 }); // Sort by eventDate in descending order

  return res
    .status(201)
    .json(new ApiResponse(201, events, "Event added successfully"));
});


const upcomingEvents = asyncHandler(async (req, res) => {

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the beginning of the day

  const events = await Event.find({
    organizedBy: req.organisation._id,
    eventDate: { $gt: today },
  }).sort({ eventDate: 1 }); 

  return res
    .status(201)
    .json(new ApiResponse(201, events, "Event added successfully"));
});


const getAllEvents = asyncHandler(async (req, res) => {

  const events = await Event.find({ organizedBy: req.organisation._id });

  return res
    .status(201)
    .json(new ApiResponse(201, events, "Event added successfully"));
});

export {
  registerOrganisation,
  loginOrganisation,
  logoutOrganisation,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentOrganisation,
  addEvent,
  pastEvents,
  upcomingEvents,
  getAllEvents,
  
};
