const authService = require("./auth.service");
const { processAndSaveImage } = require('../shared/image.service');

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios" });
  }

  try {
    const user = await authService.register({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    // Erro comum: e-mail duplicado (violação do @unique)
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
  }

  try {
    const result = await authService.login({ email, password });

    if (!result) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}


const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
    }

    // Processa a imagem usando o serviço compartilhado
    const imageUrl = await processAndSaveImage(req.file.buffer, 'profiles', req.file.originalname);
    
    // Atualiza o usuário (o ID vem do authMiddleware)
    const updatedUser = await authService.updateUserProfileImage(req.user.id, imageUrl);

    return res.status(200).json({ message: 'Imagem atualizada com sucesso', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, uploadProfileImage };