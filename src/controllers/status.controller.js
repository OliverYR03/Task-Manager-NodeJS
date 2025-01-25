import Status from "../models/status.model.js";

export const getStatus = async (req, res) => {
  try {
    const status = await Status.find();
    if (!status) return res.status(404).json({ message: "Task not found" });
    return res.json(status);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createStatus = async (req, res) => {
  try {
    const { title } = req.body;

    const newCat = new Status({
      title,
    });
    const savedCat = await newCat.save();
    res.json(savedCat);
  } catch (error) {
    return res.status(500).json({ message: "Categoria ya registrada" });
  }
};

export const deleteStatus = async (req, res) => {
  const categorie = await Status.findByIdAndDelete(req.params.id);
  if (!categorie)
    return res.status(404).json({ message: "Categorie not found" });
  return res.status(204).json({ message: "Categorie deleted succefully" });
};

export const updateStatus = async (req, res) => {
  const categorie = await Status.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!categorie)
    return res.status(404).json({ message: "Categorie not found" });
  res.json(categorie);
};

