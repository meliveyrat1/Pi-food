const checkData = (req, res, next) => {
    const { title, summary } = req.body;
  
    if (!title) {
      return res.status(400).send({ error: "Is necessary add a title" });
    }
    if (!summary) {
      return res.status(400).send({ error: "Is necessary add a summary" });
    }
    
    next();
  };
  
  module.exports = checkData;