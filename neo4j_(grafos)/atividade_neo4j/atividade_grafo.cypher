create  (arl:Person {name: "Arlete"}),
        (j:Person {name: "João"}),
        (m:Person {name: "Maria"}),
        (ari:Person {name: "Aristides"}),
        (c:Car {model: "Fusca"})
return arl, j, m, ari, c;

match (arl:Person) where arl.name = "Arlete"
match (j:Person) where j.name = "João"
match (m:Person) where m.name = "Maria"
match (ari:Person) where ari.name = "Aristides"
match (f:Car) where f.model = "Fusca"
create  (arl)-[:FILHA_DE]->(j), (arl)-[:FILHA_DE]->(m),
        (ari)-[:FILHO_DE]->(j), (ari)-[:FILHO_DE]->(m),
        (j)-[:PAI_DE]->(arl), (m)-[:MAE_DE]->(arl),
        (j)-[:PAI_DE]->(ari), (m)-[:MAE_DE]->(ari),
        (j)-[:MARIDO_DE]->(m), (m)-[:ESPOSA_DE]->(j),
        (arl)-[:IRMA_DE]->(ari), (ari)-[:IRMAO_DE]->(arl),
        (ari)-[:POSSUI]->(f)
return arl, j, m, ari, f;
