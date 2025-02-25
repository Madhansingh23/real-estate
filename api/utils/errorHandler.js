// export const errorHandler=(err,req,res,next)=>{
  
//     const statusCode=err.statusCode||500;
//     const message=err.message||"Internal Server Error";
  
//     res.status(statusCode).json({
//       success: false,
//       statusCode,
//       message,
//     });
//   };
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false, // Ensure response always contains a success field
    statusCode,
    message,
  });
};
