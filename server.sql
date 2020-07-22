use db_eng_esamc
create database db_eng_esamc

create table tb_contato(
	id int not null auto_increment primary key,
    nome varchar(255),
    email varchar(255)
    telefone varchar(12) null
    redesocial varchar(255) NULL
    cpf varchar(11) null


)
select * from tb_contato
