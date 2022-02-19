import { createLogger, format, transports } from "winston";

const formatLog = format.combine(format.colorize(), format.timestamp());

const logger = createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: "error.log", level: "error", format: formatLog }),
    new transports.File({ filename: "combined.log", format: formatLog }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.simple(), format.colorize()),
    })
  );
}

export const infoLogger = logger.info;
export const warnLogger = logger.warn;
export const errorLogger = logger.error;
export const debugLogger = (...props: any[]) => {
  if (process.env.NODE_ENV !== "production") logger.debug(props);
};
