/* eslint-disable complexity */
const CustomError = require("./CustomError");
const { DEFAULT_MAPPERS } = require("./mappers");
const { getRequest, getError } = require("./helpers");

module.exports = (options, mappers = DEFAULT_MAPPERS) =>
  async function ErrorHandler(error, request, reply) {
    request.log.error({
      request: getRequest(request),
      error: getError(error),
      log_trace: request.logTrace,
      message: "Error while processing request"
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const mapper of mappers) {
      const resp = mapper(error, options);
      if (resp) {
        return reply.code(resp.code).send(resp.response);
      }
    }
    const unhandledError = CustomError.create({
      httpCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR"
    });
    return reply.code(unhandledError.code).send(unhandledError.response);
  };
