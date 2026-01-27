Projeto 12: Around The US (API Integration)

O Around The US é uma página web interativa e responsiva desenvolvida durante o curso de Desenvolvimento Web da TripleTen. Nesta etapa final, o projeto deixou de ser apenas visual para se tornar uma aplicação dinâmica conectada a um servidor real.

A partir deste projeto, implementamos o consumo de uma API REST, permitindo que as alterações (como fotos, curtidas e informações de perfil) sejam salvas permanentemente no servidor.

🚀 Tecnologias e Conceitos Implementados

JavaScript Assíncrono: Uso de fetch, Promises e Promise.all para gerenciar requisições ao servidor.

Programação Orientada a Objetos (POO): Organização total do código em classes modulares (Api, Card, Section, UserInfo, Popup).

Integração com API REST: Implementação de métodos GET, POST, PATCH, PUT e DELETE.

UX/UI Avançada: Feedbacks visuais de carregamento ("Salvando...") e modais de confirmação para ações destrutivas (deleção).

Validação de Formulários: Garantia de integridade dos dados inseridos pelo usuário com feedback em tempo real.

✨ Novas Funcionalidades (Sprint 12)

Sincronização com Servidor: As informações do usuário e os cards são carregados dinamicamente do servidor ao iniciar a página.

Edição de Avatar: Possibilidade de alterar a foto de perfil com atualização via API (PATCH).

Sistema de Curtidas Real: O número de curtidas e o estado do ícone de "coração" são gerenciados pelo servidor.

Deleção com Confirmação: Implementação de um popup de confirmação antes de remover definitivamente um card do servidor.

Controle de Propriedade: O botão de deletar aparece exclusivamente nos cards criados pelo usuário logado.

🛠️ Como o Código foi Estruturado

Api.js: Gerencia todas as requisições de rede.

Card.js: Lógica de criação de cards, incluindo tratamento de likes e lógica de permissão de deleção.

UserInfo.js: Gerencia a exibição das informações do usuário na tela, incluindo o avatar.

PopupWithConfirmation.js: Classe específica para lidar com ações que exigem confirmação do usuário antes de executar uma chamada de API.

💻 Como Usar
Clone este repositório:

Bash

git clone https://github.com/Franciele-M-Aquino/web_project_around

Abra o arquivo index.html no seu navegador ou acesse o link do GitHub Pages para ver o projeto em execução.
