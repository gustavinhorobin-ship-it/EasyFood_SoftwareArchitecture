const express = require("express");
const controller = require("./auth.controller");
const authService = require("./auth.service");
const authenticate = require("./auth.middleware");
const upload = require('../shared/upload.middleware');
const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

// A ROTA DE IMAGEM DEVE FICAR AQUI FORA:
router.post('/me/image', authenticate, upload.single('image'), controller.uploadProfileImage);

// Rota protegida: busca os dados completos do usuário no banco
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await authService.getById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Você está autenticado!", user });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;