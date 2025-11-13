async function fetchAgents() {
  const res = await fetch("http://localhost:3000/api/agents");
  const agents = await res.json();
  const container = document.getElementById("agents");
  agents.forEach(agent => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${agent.name}</h3><p>${agent.description}</p>`;
    container.appendChild(div);
  });
}

fetchAgents();
