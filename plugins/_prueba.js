const recetas = [
  { id: 1, nombre: "Pizza Casera", ingredientes: "Harina, levadura, tomate, queso, orégano", tiempo: "30 min" },
  { id: 2, nombre: "Pasta Alfredo", ingredientes: "Pasta, crema, mantequilla, ajo, queso parmesano", tiempo: "25 min" },
  { id: 3, nombre: "Ensalada César", ingredientes: "Lechuga, pollo, crutones, queso parmesano, aderezo césar", tiempo: "15 min" },
  { id: 4, nombre: "Tacos de Carne", ingredientes: "Tortillas, carne de res, cebolla, cilantro, salsa", tiempo: "20 min" },
  { id: 5, nombre: "Sopa de Lentejas", ingredientes: "Lentejas, zanahoria, cebolla, tomate, especias", tiempo: "40 min" },
  { id: 6, nombre: "Hamburguesa Clásica", ingredientes: "Pan, carne molida, lechuga, tomate, queso, mayonesa", tiempo: "20 min" },
  { id: 7, nombre: "Arroz Frito", ingredientes: "Arroz, huevo, zanahoria, cebolla, salsa de soja", tiempo: "15 min" },
  { id: 8, nombre: "Pollo al Curry", ingredientes: "Pollo, curry, leche de coco, cebolla, ajo, jengibre", tiempo: "35 min" },
  { id: 9, nombre: "Brownies", ingredientes: "Harina, azúcar, cacao, huevo, mantequilla", tiempo: "30 min" },
  { id: 10, nombre: "Batido de Fresas", ingredientes: "Fresas, leche, azúcar, hielo", tiempo: "10 min" }
];

const mostrarRecetas = () => {
  let mensaje = "🍽 *RECETAS DISPONIBLES* 🍽\n\n";
  recetas.forEach(item => {
    mensaje += `📖 *${item.id}.* ${item.nombre}\n📝 Ingredientes: ${item.ingredientes}\n⏳ Tiempo: ${item.tiempo}\n\n`;
  });
  mensaje += "📌 *Responde con el número de la receta para más detalles.*";
  return mensaje;
};

const mostrarDetallesReceta = (texto) => {
  let id = parseInt(texto.trim());
  let receta = recetas.find(item => item.id === id);

  if (!receta) return "❌ No has seleccionado una receta válida.";

  return `🍽 *${receta.nombre}*\n\n📝 *Ingredientes:* ${receta.ingredientes}\n⏳ *Tiempo de preparación:* ${receta.tiempo}`;
};

const handler = async (m, { text }) => {
  if (!text) return m.reply(mostrarRecetas());
  m.reply(mostrarDetallesReceta(text));
};

handler.help = ['recetas'];
handler.tags = ['cocina'];
handler.command = ['receta', 'recetas', 'cocina'];

export default handler;