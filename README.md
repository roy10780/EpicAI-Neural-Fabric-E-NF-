# Arquitectura EpicAI Neural Fabric

```mermaid
flowchart TD
    Frontend[Frontend: React + Tailwind] -->|Comunica| Backend[Backend: Node.js + Python]
    
    Backend --> Microservicios[Microservicios: Docker/K8s]
    Microservicios --> Agentes[Agentes IA plug-and-play]
    
    Backend --> DB[Base de datos: PostgreSQL + Redis]
    
    Backend --> Blockchain[Blockchain: Ethereum/EVM]
    Blockchain --> Tokenizacion[Tokenización EAI & Microtransacciones]
    
    Backend --> Marketplace[Marketplace de Agentes IA]
    Marketplace --> Economía[Economía IA: Licencias, Suscripciones, Royalties]
    
    %% Conexión entre módulos para flujo global
    Agentes --> Blockchain
    Agentes --> Marketplace
    Marketplace --> Economía
    DB --> Backend
