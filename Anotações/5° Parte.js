// Começaremos pela criação de nosso middleware de altenticação
// Vamos criar uma middleware(interceptador de rota) para visualizar se nosso token é valido
// Com middleware de autentica criado vamos precisar colocá-lo em nossas rotas
// Vamos colocar o na autorização o campo authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmNTVhNzg2LWQzMjMtNDY0ZC05NTMzLWM5NDJmYjczZGQ4NSIsImVtYWlsIjoiZ2FicmllbEBnbWFpbC5jb20iLCJpYXQiOjE3NDE1NDQ3ODAsImV4cCI6MTc0MTYzMTE4MH0.yhVQmo83nNkBE4FqrYGgtjaJeQq45mIlaHnrFXM0M3Q