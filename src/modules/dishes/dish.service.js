const prisma = require("../../database/prisma");

function validateDish(data) {
  if (typeof data.name !== "string" || !data.name.trim()) {
    const error = new Error("Nome é obrigatório");
    error.statusCode = 400;
    throw error;
  }
  
  // ⬅️ VALIDAÇÃO DE CATEGORIA REMOVIDA DAQUI
  
  if (typeof data.description !== "string") {
    const error = new Error("Descrição inválida");
    error.statusCode = 400;
    throw error;
  }
  
  const price = Number(data.price);
  if (
    data.price === null ||
    data.price === undefined ||
    data.price === "" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    const error = new Error("Preço inválido");
    error.statusCode = 400;
    throw error;
  }
  
  return {
    name: data.name.trim(),
    // Se a categoria vier, faz o trim. Se não vier, salva vazio para não dar erro no banco
    category: data.category ? data.category.trim() : "", 
    description: data.description,
    price: price.toFixed(2)
  };
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) {
    const error = new Error("Identificador inválido");
    error.statusCode = 400;
    throw error;
  }
  return id;
}

// ⬅️ NOVA: autorização por dono
function ensureOwnership(restaurant, userId) {
  if (restaurant.ownerId !== userId) {
    const error = new Error("Você não tem permissão para gerenciar este restaurante");
    error.statusCode = 403;
    throw error;
  }
}

// ⬅️ NOVA: carrega o prato com o restaurante (pra ter o ownerId)
async function getDishWithRestaurant(dishId) {
  const id = parseId(dishId);
  const dish = await prisma.dish.findUnique({
    where: { id },
    include: { restaurant: true }
  });
  if (!dish) {
    const error = new Error("Prato não encontrado");
    error.statusCode = 404;
    throw error;
  }
  return dish;
}

async function createDish(restaurantId, data, userId) { 
  const id = parseId(restaurantId);
  const validated = validateDish(data);
  const restaurant = await prisma.restaurant.findUnique({ where: { id } });
  if (!restaurant) {
    const error = new Error("Restaurante não encontrado");
    error.statusCode = 404;
    throw error;
  }

  ensureOwnership(restaurant, userId); 

  return prisma.dish.create({
    // imageUrl começa vazio: o prato é criado primeiro, a imagem é enviada depois.
    data: { ...validated, imageUrl: "", restaurantId: id }
  });
}

async function listDishes(restaurantId) {
  const id = parseId(restaurantId);
  return prisma.dish.findMany({
    where: { restaurantId: id },
    orderBy: { id: "asc" }
  });
}

// público — NÃO muda
async function getDish(dishId) {
  const id = parseId(dishId);
  const dish = await prisma.dish.findUnique({ where: { id } });
  if (!dish) {
    const error = new Error("Prato não encontrado");
    error.statusCode = 404;
    throw error;
  }
  return dish;
}

async function updateDish(dishId, data, userId) { 
  const validated = validateDish(data);
  const dish = await getDishWithRestaurant(dishId); 

  ensureOwnership(dish.restaurant, userId); 

  return prisma.dish.update({
    where: { id: dish.id },
    data: validated
  });
}

async function deleteDish(dishId, userId) { 
  const dish = await getDishWithRestaurant(dishId); 

  ensureOwnership(dish.restaurant, userId); 

  await prisma.dish.delete({ where: { id: dish.id } });
}

const getDishById = async (dishId) => {
  const id = parseId(dishId); // ⬅️ Converte o texto da URL para número
  return await prisma.dish.findUnique({ where: { id } });
};

const updateDishImage = async (dishId, imageUrl) => {
  const id = parseId(dishId); // ⬅️ Converte o texto da URL para número
  return await prisma.dish.update({
    where: { id },
    data: { imageUrl }
  });
};

module.exports = {
  createDish,
  listDishes,
  getDish,
  updateDish,
  deleteDish,
  parseId,
  getDishById, 
  updateDishImage
};