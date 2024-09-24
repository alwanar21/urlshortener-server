import urlService from "../service/url-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await urlService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await urlService.get(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getUrl = async (req, res, next) => {
  try {
    await urlService.getUrl(req, res);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const newURL = await urlService.create(req);
    res.status(201).json({
      message: "Url created successfully",
      data: newURL,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await urlService.update(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await urlService.updateStatus(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await urlService.remove(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default {
  get,
  getAll,
  getUrl,
  create,
  update,
  updateStatus,
  remove,
};
