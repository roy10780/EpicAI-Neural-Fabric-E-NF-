/**
 * EpicAI Neural Fabric
 * Demo de backend + frontend + agentes IA + blockchain básico
 * Ejecutar: node epicai.js
 */

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// ----------------- Agentes IA -----------------
const agents = [
  { id: 1, name: "EpicAI-NLP", description: "Procesa lenguaje natural y conecta APIs." },
  { id: 2, name: "EpicAI-Vision", description: "Procesa imágenes y videos." },
  { id: 3, name: "EpicAI-Recommend", description: "Recomienda contenido y predice tendencias." },
];

// API de agentes
app.get("/api/agents", (req, res) => res.json(agents));
app.post("/api/agents/run", (req, res) => {
  const { id, input } = req.body;
  const agent = agents.find(a => a.id === id);
  if (!agent) return res.status(404).json({ error: "Agente no encontrado" });
  res.json({ agent: agent.name, input, output: `Procesado con ${agent.name}` });
});

// ----------------- Blockchain Demo -----------------
class EpicAIToken {
  constructor() {
    this.name = "EpicAI Token";
    this.symbol = "EAI";
    this.totalSupply = 1000000;
    this.balanceOf = {};
  }
  mint(address, amount) {
    if (!this.balanceOf[address]) this.balanceOf[address] = 0;
    this.balanceOf[address] += amount;
    this.totalSupply += amount;
  }
  transfer(from, to, amount) {
    if (!this.balanceOf[from] || this.balanceOf[from] < amount) return false;
    if (!this.balanceOf[to]) this.balanceOf[to] = 0;
    this.balanceOf[from] -= amount;
    this.balanceOf[to] += amount;
    return true;
  }
}
const token = new EpicAIToken();
token.mint("admin", 1000000);

// API blockchain
app.get("/api/token", (req,res)=> res.json(token));
app.post("/api/token/transfer", (req,res)=>{
  const {from, to, amount} = req.body;
  const ok = token.transfer(from,to,amount);
  res.json({success: ok, balances: token.balanceOf});
});

// ----------------- Frontend Integrado -----------------
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>EpicAI Neural Fabric ⚡</title>
    <style>
      body{font-family:Arial,sans-serif;background:#0d0d0d;color:#fff;text-align:center;padding:50px;}
      h1{color:#00f0ff;margin-bottom:30px;}
      div{background:#1a1a1a;padding:15px;margin:10px auto;width:50%;border-radius:8px;box-shadow:0 0 10px #00f0ff;}
      button{padding:10px 20px;margin-top:10px;background:#00f0ff;color:#000;border:none;border-radius:5px;cursor:pointer;}
    </style>
  </head>
  <body>
    <h1>EpicAI Neural Fabric ⚡</h1>
    <div id="agents"></div>
    <div>
      <h2>Blockchain Demo</h2>
      <button onclick="showToken()">Ver Balances Token</button>
      <pre id="token"></pre>
    </div>
    <script>
      async function fetchAgents(){
        const res = await fetch("/api/agents");
        const agents = await res.json();
        const container = document.getElementById("agents");
        agents.forEach(a=>{
          const div=document.createElement("div");
          div.innerHTML=\`<h3>\${a.name}</h3><p>\${a.description}</p>
          <input id="input-\${a.id}" placeholder="Input"/>
          <button onclick="runAgent(\${a.id})">Run Agent</button>
          <pre id="output-\${a.id}"></pre>\`;
          container.appendChild(div);
        });
      }
      async function runAgent(id){
        const input = document.getElementById("input-"+id).value;
        const res = await fetch("/api/agents/run",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,input})});
        const out = await res.json();
        document.getElementById("output-"+id).textContent = JSON.stringify(out,null,2);
      }
      async function showToken(){
        const res = await fetch("/api/token");
        const t = await res.json();
        document.getElementById("token").textContent = JSON.stringify(t,null,2);
      }
      fetchAgents();
    </script>
  </body>
  </html>
  `);
});

// ----------------- Servidor -----------------
app.listen(port, () => console.log(`EpicAI Neural Fabric corriendo en http://localhost:${port} 🚀`));
