ADR-001 - ARMANAZENAR RESTAURANTES EM MEMÓRIA 

STATUS: ACEITA
DATA: 23-09-2026
RESPONSÁVEL: GUSTAVO CARDOSO

##CONTEXTO
Primeira versão da API do EasyFood, ainda precisa desenvolver uma lista de restaurantes para consultar e permitir cadastrar novos restaurantes
 
A aplicação está em fase de prototipação, teste e validação, no momento a prioridade é verificar o fluxo e apresentar pra investidores
 

----

## Alternativas consideradas

1 - ARRAY EM MEMÓRIA 

2 - PostgresSQL

3 - Mongo DB

4 - SQLITE

5 - Firebase

6 - Json

## Decisão 

Adotar array em memória como mecanismo de armazenamento na versão incial do serviço


## Justificativa

- Permite praticidade, velocidade em desenvolvimento e teste nas APIs
- Menor complexidade 
- Zero custo no desenvolvimento

## Cosnequ. 

##Positivos 

Desenvolveu e testou rápido
Conseguimos comprovar conceito de negócio

#negativo

Não conseguimos salvar dados 
Não suporta Compartilhamento / análise de dados 
Fluxo de resposta não faz sentido 
Sem integridade de dados



## Critérios de revisão

Esta decisão deve ser reavaliada quando:

1. O MVP for validado e houver decisão de ir para produção
2. Houver necessidade de persistência entre deploys
3. O volume de dados ultrapassar o que é razoável manter em memória
4. For necessário suporte a consultas complexas ou relacionamentos entre entidades

---


