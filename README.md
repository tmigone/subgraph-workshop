# Subgraph workshop

### Pre-requisitos

1. Registrarse en The Graph Studio: https://thegraph.com/studio
2. Crear un subgraph en The Graph Studio
3. Seguir pasos en página de detalles del subgaph

### Objetivo

https://www.heroesofnft.com/ es un juego de cartas coleccionables que usa NFTs. El objetivo es armar un subgraph para poder contestar las siguientes preguntas:
- Quienes son las 10 cuentas con más cartas (NFTs)
- Cuales son las cartas más transferidas
- Que cantidad de NFTs hay en total
- Log de transferencias de NFTs

### Links
- https://www.heroesofnft.com/
- https://github.com/heroesofnft/nft/blob/main/contracts/HeroesToken.sol
- https://thegraph.com/explorer
- https://thegraph.com/studio
- https://docs.openzeppelin.com/contracts/5.x/api/token/erc721
- https://snowtrace.io/address/0x40f118e9b9e3781DA838e021d5b9f3D070C93D00
- https://github.com/heroesofnft/subgraphs/tree/main/hero-heroes-token
- https://thegraph.com/docs/en/developing/graph-ts/README/


### Snippets

```
import {
  Account,
} from "../generated/schema";

import { Transfer } from "../generated/HeroesToken/HeroesToken";

// '0x0000000000000000000000000000000000000000'
```