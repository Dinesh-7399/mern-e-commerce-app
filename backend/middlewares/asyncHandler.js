const asyncHandler = (fn) => (req,res,next) => {
  Promise.resolve(
    fn(req,res,next)
  ).catch(error => {
    res.status(500).json({
      msg : error.message
    });
  })
};
export default asyncHandler;