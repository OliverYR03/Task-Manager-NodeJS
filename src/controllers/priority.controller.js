import Priority from "../models/priority.model.js"
export const getPriority = async (req, res) => {
    try {
      const priority = await Priority.find();
      if (!priority) return res.status(404).json({ message: "Task not found" });
      return res.json(priority);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const createPriority = async (req, res) => {
    try {
      const { title } = req.body;
  
      const newPriority = new Priority({
        title,
      });
      const savedPriority = await newPriority.save();
      res.json(savedPriority);
    } catch (error) {
      return res.status(500).json({ message: "Categoria ya registrada" });
    }
  };
  
  export const deletePriority = async (req, res) => {
    const priority = await Status.findByIdAndDelete(req.params.id);
    if (!priority)
      return res.status(404).json({ message: "Categorie not found" });
    return res.status(204).json({ message: "Categorie deleted succefully" });
  };
  
  export const updatePriority = async (req, res) => {
    const priority = await Status.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!priority)
      return res.status(404).json({ message: "Categorie not found" });
    res.json(priority);
  };
  
  