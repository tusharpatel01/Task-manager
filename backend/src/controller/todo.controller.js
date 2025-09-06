import Todo from "../model/todo.model";
// Create a todo
export const createTodo = async (req, res) => {
  try {
    const { task, description, time } = req.body;
    const newTodo = new Todo({ user: req.user, task, description, time });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all todos with search, filter, pagination
export const getTodos = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 5 } = req.query;
    const query = { user: req.user };

    if (status && status !== "all") query.status = status;
    if (search) query.task = { $regex: search, $options: "i" };

    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Todo.countDocuments(query);

    res.json({ todos, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    Object.assign(todo, req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
