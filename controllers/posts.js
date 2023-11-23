const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req, res) {
  const data = await prisma.post.findMany();

  return res.json(data);
}

async function show(req, res) {
  // const id = req.params.id;
  const { id } = req.params;

  const data = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!data) {
    throw new Error("Not found");
  }

  return res.json(data);
}

async function store(req, res) {
  const datiInIngresso = req.body;
  console.log(datiInIngresso);

  if (!datiInIngresso) {
    return res.status(400).send("Dati di ingresso mancanti o non validi");
  }

  const newPost = await prisma.post.create({
    data: {
      title: datiInIngresso.title,
      slug: datiInIngresso.slug,
      image: datiInIngresso.image,
      content: datiInIngresso.content,
      published: datiInIngresso.published,
    }
  })

  return res.json(newPost);
}


async function update(req, res) {
  const id = req.params.id;
  const datiInIngresso = req.body;

  // controllo se qul post esiste
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!post) {
    throw new Error('Not found');
  }

  const postAggiornato = await prisma.post.update({
    data: datiInIngresso,
    where: {
      id: parseInt(id),
    },
  })

  return res.json(postAggiornato)
}

async function destroy(req, res) {
  await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.json({ message: "Post eliminato" });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
};
