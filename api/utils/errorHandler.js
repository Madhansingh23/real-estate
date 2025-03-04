// export const errorHandler = (err, req, res, next) => {
//   console.error("Server Error:", err); // Log server errors

//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message, // Ensure message is always included
//   });
// };

// export const errorHandler = (err, req, res, next) => {
//   if (!res || res.headersSent) return next(err); // Prevent duplicate response

//   console.error("Server Error:", err.message || err);

//   res.status(err.status || 500).json({
//     success: false,
//     status: err.status || 500,
//     message: err.message || "Internal Server Error",
//   });
// };
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
