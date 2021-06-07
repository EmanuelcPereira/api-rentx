**REQUISITOS FUNCIONAIS** //O QUE PODERÁ SER FEITO NA APLICAÇÃO

**REQUISITOS NÃO FUNCIONAIS** //QUAIS FERRAMENTAS E BIBILIOTECAS UTILIZAR

**REGRAS DE NEGOCIOS** // REGRAS QUE DELIMITAM O FUNCIONAMENTO DOS REQUISITOS FUNCIONAIS


# CADASTRO DE CARROS

RF:
- deve ser possivel cadastrar um carro
- deve ser possivel listar todos os carros pela categorias.
- deve ser possivel listar todos os carros disponiveis pela marca.
- deve ser possivel listar todos os carros disponiveis pelo nome do carro.

RN:
- Não deve ser possivel cadastrar dois carros usando uma placa já cadastrada.
- não deve ser possivel alterar a placa de um carro já cadastrado.
- o carro deve ser cadastrado com o available = true por padrão.
- somente um admin poderá cadastrar um veículo.


# LISTAGEM DE CARROS

RF:
- deve ser possivel listar os carros que estão disponiveis.

RN:
- O usuario não precisa estar logado no sistema para listar veiculos available.

# CADASTRO DE ESPEICIFICAÇÃO DOS CARROS

RF:
- deve ser possivel cadastrar uma especificação para um carro.
- deve ser possivel listar todas as especificações.
- deve ser possivel listar todos os carros

RN:
- não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
- não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
- somente um admin poderá cadastrar especificações.

# CADASTRO DE IMAGENS DO CARRO

RF:
- deve ser possivel cadastrar uma imagem do carro.
- deve ser possivel listar todos os carros.

RNF:
- utilizar o multer para upload dos arquivos.

RN:
- o admin poderá cadastrar mais de uma imagem para o carro.
- o responsavel pelo cadastro de imagem será o admin

# AGENDAMENTO DE LOCAÇÃO

RF:
- deve ser possivel agendar uma locação

RN:
- o aluguel deve ter duração minima de 24 horas.
- não deve ser possivel cadastrar um aluguel caso já exista um agendamento para o mesmo usuario.
- não deve ser possivel cadastrar um aluguel caso já exista um agendamento para um carro.
