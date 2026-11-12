const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processAndSaveImage = async (buffer, folder, originalName) => {
  // Cria a pasta de destino caso não exista
  const uploadsDir = path.join(__dirname, '../../../uploads', folder);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Define um nome único e padroniza para .webp
  const fileName = `${Date.now()}-${path.parse(originalName).name}.webp`;
  const filePath = path.join(uploadsDir, fileName);

  // Otimiza com Sharp
  await sharp(buffer)
    .resize(800) // Redimensiona a largura máxima para 800px
    .webp({ quality: 80 }) // Converte para WebP com 80% de qualidade
    .toFile(filePath);

  // Retorna o caminho relativo que será salvo no banco e acessado pelo navegador
  return `/uploads/${folder}/${fileName}`;
};

module.exports = { processAndSaveImage };