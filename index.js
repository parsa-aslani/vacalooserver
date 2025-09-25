const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ---------- USERS ---------- */
app.get("/users/login", async (req, res) => {
  const { username, password } = req.query;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/users", async (req, res) => {
  const { username, password } = req.query;

  try {
    if (username && password) {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
          password: password,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Invalid username or password" });
      }

      return res.json(user);
    }

    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/users", async (req, res) => {
  const { username, password, score } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, password, score },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, score } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: {
        username,
        password,
        score: score !== undefined ? parseInt(score, 10) : undefined,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.code === "P2025") {
      // کاربر پیدا نشد
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: error.message });
  }
});
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

/* ---------- OFFER ADD WORDS ---------- */
app.get("/offeraddwords", async (req, res) => {
  try {
    const words = await prisma.offerAddWord.findMany();
    res.json(words);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/offeraddwords", async (req, res) => {
  const { offeraddword } = req.body;
  try {
    const word = await prisma.offerAddWord.create({ data: { offeraddword } });
    res.status(201).json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/offeraddwords/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWord = await prisma.offerAddWord.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json({
      message: "OfferAddWord deleted successfully",
      deletedWord,
    });
  } catch (error) {
    console.error("Error deleting offerAddWord:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "OfferAddWord not found" });
    }

    res.status(500).json({ message: error.message });
  }
});
/* ---------- OFFER REMOVE WORDS ---------- */
app.get("/offerremovewords", async (req, res) => {
  try {
    const words = await prisma.offerRemoveWord.findMany();
    res.json(words);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/offerremovewords", async (req, res) => {
  const { offerremoveword } = req.body;
  try {
    const word = await prisma.offerRemoveWord.create({
      data: { offerremoveword },
    });
    res.status(201).json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/offerremovewords/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWord = await prisma.offerRemoveWord.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json({
      message: "OfferRemoveWord deleted successfully",
      deletedWord,
    });
  } catch (error) {
    console.error("Error deleting offerRemoveWord:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "OfferRemoveWord not found" });
    }

    res.status(500).json({ message: error.message });
  }
});
/* ---------- 4 LETTER WORDS ---------- */
app.get("/fourletterwords", async (req, res) => {
  try {
    const words = await prisma.fourLetterWord.findMany();
    res.json(words);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/fourletterwords", async (req, res) => {
  const { word } = req.body;
  try {
    const newWord = await prisma.fourLetterWord.create({ data: { word } });
    res.status(201).json(newWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/fourletterwords/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWord = await prisma.fourLetterWord.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json({
      message: "FourLetterWord deleted successfully",
      deletedWord,
    });
  } catch (error) {
    console.error("Error deleting fourLetterWord:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "FourLetterWord not found" });
    }

    res.status(500).json({ message: error.message });
  }
});
/* ---------- 5 LETTER WORDS ---------- */
app.get("/fiveletterwords", async (req, res) => {
  try {
    const words = await prisma.fiveLetterWord.findMany();
    res.json(words);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/fiveletterwords", async (req, res) => {
  const { word } = req.body;
  try {
    const newWord = await prisma.fiveLetterWord.create({ data: { word } });
    res.status(201).json(newWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/fiveletterwords/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWord = await prisma.fiveLetterWord.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json({
      message: "FiveLetterWord deleted successfully",
      deletedWord,
    });
  } catch (error) {
    console.error("Error deleting fiveLetterWord:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "FiveLetterWord not found" });
    }

    res.status(500).json({ message: error.message });
  }
});
/* ---------- 6 LETTER WORDS ---------- */
app.get("/sixletterwords", async (req, res) => {
  try {
    const words = await prisma.sixLetterWord.findMany();
    res.json(words);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/sixletterwords", async (req, res) => {
  const { word } = req.body;
  try {
    const newWord = await prisma.sixLetterWord.create({ data: { word } });
    res.status(201).json(newWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/sixletterwords/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWord = await prisma.sixLetterWord.delete({
      where: { id: parseInt(id, 10) },
    });

    res.json({
      message: "SixLetterWord deleted successfully",
      deletedWord,
    });
  } catch (error) {
    console.error("Error deleting sixLetterWord:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "SixLetterWord not found" });
    }

    res.status(500).json({ message: error.message });
  }
});
/* ---------- START SERVER ---------- */
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
