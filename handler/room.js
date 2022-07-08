const GetAll = (req, res) => {
  res.json({ status: 'success', message: 'Room Get ALL' }).status(400);
};

const GetById = (req, res) => {
  const id = req.params.id;
  res.json({ status: 'success', message: id }).status(400);
};

module.exports = {
  GetAll,
  GetById,
};
