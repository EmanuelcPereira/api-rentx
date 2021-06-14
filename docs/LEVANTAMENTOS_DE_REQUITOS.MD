**REQUISITOS FUNCIONAIS** //O QUE PODERÁ SER FEITO NA APLICAÇÃO

**REQUISITOS NÃO FUNCIONAIS** //QUAIS FERRAMENTAS E BIBILIOTECAS UTILIZAR

**REGRAS DE NEGOCIOS** // REGRAS QUE DELIMITAM O FUNCIONAMENTO DOS REQUISITOS FUNCIONAIS


# CADASTRO DE CARROS

RF:
- [x] deve ser possivel cadastrar um carro


RN:
- [x] Não deve ser possivel cadastrar dois carros usando uma placa já cadastrada.
- [x] o carro deve ser cadastrado com o available = true por padrão.
- [x] somente um admin poderá cadastrar um veículo.


# LISTAGEM DE CARROS

RF:
- [x] deve ser possivel listar os carros que estão disponiveis.
- [x] deve ser possivel listar todos os carros pela categorias.
- [x] deve ser possivel listar todos os carros disponiveis pela marca.
- [x] deve ser possivel listar todos os carros disponiveis pelo nome do carro.

RN:
- [x] O usuario não precisa estar logado no sistema para listar veiculos available.

# CADASTRO DE ESPEICIFICAÇÃO DOS CARROS

RF:
- [x] deve ser possivel cadastrar uma especificação para um carro.

RN:
- [x] não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
- [x] não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
- [x] somente um admin poderá cadastrar especificações.

# CADASTRO DE IMAGENS DO CARRO

RF:
- [x] deve ser possivel cadastrar imagens do carro.

RNF:
- [x] utilizar o multer para upload dos arquivos.

RN:
- [x] poderá cadastrar mais de uma imagem para o carro.
- [x] o responsavel pelo cadastro de imagem será o admin

# AGENDAMENTO DE LOCAÇÃO

RF:
- deve ser possivel agendar uma locação

RN:
- [x] o aluguel deve ter duração minima de 24 horas.
- [x] não deve ser possivel cadastrar um aluguel caso já exista um agendamento para o mesmo usuario.
- [x] não deve ser possivel cadastrar um aluguel caso já exista um agendamento para um carro.
- [x] Ao locar um carro, o status deverá ser alterado para não disponivel.

# DEVOLUÇÃO DE CARRO

RF:
- [x] Deve ser possivel realizar a devolução de um carro.

RN:
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [x] Ao ser realizado a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao ser realizado a devolução, o usuário deverá ser liberado para locar novamente.
- [x] Ao ser realizado a devolução, deverá ser calculado o total do aluguel.
- [] Caso o horario de devolução seja superior ao previsto, deverá ser cobrado multa proporcional aos dias de atraso.
- [] Caso haja multa, deverá ser somado ao total do aluguel.

# LISTAGEM DE ALUGUEL PARA USUÁRIO

RF:
- [x] Deve ser possivel realizar a busca de todos os alugueis para o usuario.

RN:
- [x] O usuario deve estar logado na aplicação.

# RECUPERAÇÃO DE SENHA

RF:
- [] Deve ser possível o usuário recuperar a senha informando o email
- [] O usuário deve ser receber um email com o passo a passo para recuperação da senha
- [] O usuário deve conseguir inserir uma nova senha

RN:
- [] O usuário precisa inserir uma nova senha
- [] O link enviado para recuperação deve expirar em 3 horas