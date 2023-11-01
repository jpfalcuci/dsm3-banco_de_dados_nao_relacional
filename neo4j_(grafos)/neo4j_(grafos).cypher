// Comando básico de busca no Cypher (linguagem do Neo4J)
match(x) return x;

// No Cypher, os nodos são representados por parênteses () e as relações por colchetes []

// Comando básico de criação de um nodo. O tipo de nodo será Person
create (p:Person {name: "Frederico Fernandes", birth_date: "1989-05-19"})
return p;

// Criando uma segunda pessoa
create (p:Person {name: "Lindalva Lopes", birth_date: "1992-12-14"})
return p;

// Recuperando as duas pessoas anteriormente criadas e estabelecendo um relacionamento entre elas
match (f:Person {name: "Frederico Fernandes"})
match (l:Person {name: "Lindalva Lopes"})
create (f)-[:LOVES]->(l)
return f, l;

// Criando dois nós e um relacionamento com um único comando
create (x:Person {name: "Xisto Xavier", birth_date: "1990-05-29"})
create (a:Company {name: "Acme Inc.", branch: "Produtos de consumo"})
create (a)<-[:WORKS_AT]-(x)
return a, x;

// Usando contains para encontrar um nodo por uma parte de um atributo
match (x:Person) where x.name contains "Xisto"
match (l:Person) where l.name contains "Lindalva"
create (l)-[:LOVES]->(x)
return l, x;

// Criando mais relações
match (l:Person) where l.name contains "Lindalva"
match (a:Company) where a.name contains "Acme"
create (l)-[:WORKS_AT]->(a)-[:MAKES]->(c:Car {model: "Acme Model 1", fuel: "eletricidade"})
return l, a, c;

// Ainda mais relações
create (p:Person {name: "Norman Newman", birth_date: "1950-01-12"})
return p;

// Mais relações
match (n:Person) where n.name contains "Norman"
match (a:Company) where a.name contains "Acme"
match (f:Person) where f.name contains "Frederico"
create (n)-[:OWNS]->(a)<-[:CUSTOMER_OF]-(f)
return n, a, f;

// Frederico possui um Acme elétrico
match (f:Person) where f.name contains "Frederico"
match (c:Car) where c.model contains "Acme"
create (c)<-[:OWNS]-(f)
return c, f;

// Encontrando as pessoas que trabalham na Acme
match (p:Person)-[:WORKS_AT]->(c:Company)
where c.name contains "Acme"
return p;

// Encontrando quaisquer pessoas que tenham alguma relação com a empresa Acme
match (p:Person)-->(c:Company)
where c.name contains "Acme"
return p;

// Encontrando e atualizando as informações de um nodo
match (n:Person)
where n.name contains "Norman"
set n.name = "Norman Newman, Jr."
return n;

// Adicionando um campo a um nodo
match (l:Person)
where l.name contains "Lindalva"
set l.salary = 12500
return l;

// Inserindo um novo carro
create (c:Car {model: "Fiat 147", fuel: "etanol"})
return c;

// Excluindo o carro recém-criado
match (c:Car {model: "Fiat 147"})
delete c;

// Tentativa de excluir Norman Newman, Jr. ~> VAI DAR ERRO, porque o nodo tem um ou mais relacionamentos
match (n:Person)
where n.name contains "Norman"
delete n;

// Excluindo o relacionamento que liga Norman Newman, Jr. à empresa Acme
match (:Person {name: "Norman Newman, Jr."})-[x:OWNS]->(:Company {name: "Acme Inc."})
delete x;

// Excluindo Norman Newman, Jr. ~> AGORA VAI DAR CERTO, PORQUE O NODO FICOU ISOLADO
match (n:Person)
where n.name contains "Norman"
delete n;


// DESAFIO: Apagar o carro "Acme Model 1"

// Excluindo o relacionamento entre a empresa Acme e o carro Acme Model 1
match (:Company {name: "Acme Inc."})-[x:MAKES]->(:Car {model: "Acme Model 1"})
delete x;

// Excluindo o relacionamento entre Frederico Fernandes e o carro Acme Model 1
match (:Person {name: "Frederico Fernandes"})-[x:OWNS]->(:Car {model: "Acme Model 1"})
delete x;

// Excluindo o carro Acme Model 1, agora isolado
match (c:Car {model: "Acme Model 1"})
delete c;
