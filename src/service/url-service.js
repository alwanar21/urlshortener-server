import {
  createUrlValidation,
  updateStatusUrlValidation,
  updateUrlValidation,
} from "../validation/url-validation.js";
import { nanoid } from "nanoid";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import moment from "moment-timezone";

const getAll = async (request) => {
  const username = request.user.username;
  const pageCurrent = request.query.page;
  let page = parseInt(request.query.page, 10);

  const pageSize = 3;
  if (!pageCurrent) {
    page = 1;
  } else if (isNaN(page) || page < 1) {
    return {
      message: "URLs not found",
      data: [],
    };
  }

  const totalCount = await prismaClient.url.count({
    where: {
      username,
    },
  });

  const totalPages = Math.ceil(totalCount / pageSize);
  if (page > totalPages) {
    return {
      message: "Page not found.",
      data: [],
    };
  }

  const urls = await prismaClient.url.findMany({
    where: {
      username,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  if (urls.length < 1) {
    return {
      message: "URLs not found",
      data: tasks,
    };
  }

  const transformedUrls = urls.map((url) => {
    return {
      ...url,
      lastVisit: url.lastVisit
        ? moment(url.lastVisit).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
        : null,
      shortURL: `localhost:3000/url/${url.shortURL}`,
    };
  });

  return {
    data: transformedUrls,
    pagination: {
      totalPages,
      currentPage: page,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
  };
};

const get = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "URL not found.");
  }

  const url = await prismaClient.url.findUnique({
    where: {
      id: id,
    },
  });

  if (!url) {
    throw new ResponseError(404, "URL not found.");
  }

  if (url.username !== username) {
    throw new ResponseError(403, "You do not have permission to access this URL.");
  }

  const transformedUrl = {
    ...url,
    lastVisit: url.lastVisit
      ? moment(url.lastVisit).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
      : null,
    shortURL: `localhost:3000/url/${url.shortURL}`,
  };

  return {
    data: transformedUrl,
  };
};

const getUrl = async (request, response) => {
  const shortURL = request.params.id;

  const url = await prismaClient.url.findUnique({
    where: {
      shortURL,
    },
  });

  if (!url) {
    throw new ResponseError(404, "URL not found.");
  }

  if (url.status !== "ACTIVE") {
    throw new ResponseError(403, "URL is disabled.");
  }

  await prismaClient.url.update({
    where: {
      id: url.id,
    },
    data: {
      visitCount: url.visitCount + 1,
      lastVisit: new Date(),
    },
  });

  response.redirect(url.redirectURL);
};

const create = async (request) => {
  const username = request.user.username;

  const newURL = validate(createUrlValidation, request.body);

  const shortURL = nanoid(8);

  return prismaClient.url.create({
    data: { ...newURL, shortURL, username },
  });
};

const remove = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "URL not found.");
  }

  const url = await prismaClient.url.findUnique({
    where: {
      id: id,
    },
  });

  if (!url) {
    throw new ResponseError(404, "URL not found.");
  }

  if (url.username !== username) {
    throw new ResponseError(403, "You do not have permission to delete this url.");
  }

  await prismaClient.url.delete({
    where: {
      id: id,
    },
  });

  return {
    message: `Task ${id} removed successfully`,
  };
};

const update = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "URL not found.");
  }

  const url = await prismaClient.url.findUnique({
    where: {
      id: id,
    },
  });

  if (!url) {
    throw new ResponseError(404, "URL not found.");
  }

  if (url.username !== username) {
    throw new ResponseError(403, "You do not have permission to update this URL.");
  }

  const updateUrl = validate(updateUrlValidation, request.body);

  if (!updateUrl || Object.keys(updateUrl).length === 0) {
    throw new ResponseError(400, "No data provided for update.");
  }

  const updatedUrl = await prismaClient.url.update({
    where: {
      id: id,
    },
    data: updateUrl,
  });

  return {
    message: `URL ${id} updated successfully`,
    data: updatedUrl,
  };
};

const updateStatus = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "URL not found.");
  }

  const url = await prismaClient.url.findUnique({
    where: {
      id: id,
    },
  });

  if (!url) {
    throw new ResponseError(404, "URL not found.");
  }

  if (url.username !== username) {
    throw new ResponseError(403, "You do not have permission to update status this URL.");
  }

  let newStatus;

  if (url.status == "ACTIVE") {
    newStatus = "DISABLED";
  } else {
    newStatus = "ACTIVE";
  }

  const newUrl = await prismaClient.url.update({
    where: {
      id: id,
    },
    data: {
      status: newStatus,
    },
  });

  return {
    message: `Status URL ${id} updated successfully`,
    data: newUrl,
  };
};

export default {
  getAll,
  get,
  create,
  getUrl,
  remove,
  update,
  updateStatus,
};
