const agents = [
  { id: 1, name: "EpicAI-NLP", description: "Procesa lenguaje natural y conecta APIs." },
  { id: 2, name: "EpicAI-Vision", description: "Procesa imágenes y videos." },
];

exports.getAgents = (req, res) => res.json(agents);

exports.runAgent = (req, res) => {
  const { id, input } = req.body;
  const agent = agents.find(a => a.id === id);
  if (!agent) return res.status(404).json({ error: "Agente no encontrado" });
  res.json({ agent: agent.name, input, output: `Procesado con ${agent.name}` });
};
