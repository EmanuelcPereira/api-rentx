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
- deve ser possivel cadastrar uma imagem do carro.

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
