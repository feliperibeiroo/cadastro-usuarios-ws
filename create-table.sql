create table usuarios (
	id serial primary key,
	nome varchar(255),
	email varchar(255) unique,
	pais varchar(255),
	estado varchar(255),
	municipio varchar(255),
	cep varchar(255),
	rua varchar(255),
	numero varchar(255),
	complemento varchar(255),
	cpf varchar(255) unique,
	pis varchar(255) unique,
	encrypted_password varchar(255)
)