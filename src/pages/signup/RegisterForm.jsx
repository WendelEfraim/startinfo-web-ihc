
import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/Util.js";

import whatsapp from "../../assets/whatsapp.ico"; 

// Botão Returno - Ao clicar, redireciona para a página inicial (home)
import ButtonReturn from '../../components/buttonreturn/ButtonReturn';

// Importando a logomarca
import logo from '../../assets/startinfox.png'; // Ajuste o caminho conforme necessário

export default function RegisterForm() {

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [foneCelular, setFoneCelular] = useState();
  const [cpf, setCpf] = useState('');
  
  // Redirecionar para a página home após o cadastro
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    salvar();
  };
  
  function salvar() {

		let clienteRequest = {
		    nomeCompleto: nomeCompleto,
        username: username,
        password: password,
		    cpf: cpf,
		    foneCelular: foneCelular,
		}
	
		axios.post("http://localhost:8085/api/cliente", clienteRequest)
		.then((response) => {
      notifySuccess('Cliente cadastrado com sucesso!', response);

        // Limpar os campos do formulário
        setNomeCompleto('');
        setUsername('');
        setPassword('');
        setFoneCelular('');
        setCpf('');

        // Redirecionar para a página home após o cadastro
        navigate('/'); 
        })

		.catch((error) => {
      notifyError('Erro ao incluir o um cliente!', error)
		})
	}

  return (

    <>

      <div className="register-formulario">

        {/* Logomarca com a caixa de texto sobreposta */}
        <div className="logo-container">

          <Link to="/">
            <img src={logo} 
            alt="Logo" 
            className="logo" 
            />

          </Link>

          <div className="text-overlay">

            <h1>Seja bem-vindo <br />ao nosso Website!</h1>
            <p>Crie a Sua Conta para continuar explorando os nossos conteúdos!</p>

          </div>

        </div>

        <form onSubmit={handleSubmit} className="formulary-register">
  
        <h3> FAÇA SEU CADASTRO </h3>

          <div className="input-group">

            <label htmlFor="fullName">Nome Completo</label>

            <input
              type="text"
              id="fullName"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />

          </div>

          <div className="input-group">

            <label htmlFor="username">E-mail</label>

            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="exemplo@dominio.com"
              required
            />

          </div>

          <div className="input-group">

            <label htmlFor="password">Senha</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha segura"
              required
            />

          </div>

          <div className="input-group">

            <label htmlFor="phone">Telefone</label>

            <input
              type="text"
              id="phone"
              value={foneCelular}
              onChange={(e) => setFoneCelular(e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              required
            />

          </div>

          <div className="input-group">

            <label htmlFor="cpf">CPF</label>

            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              required
            />
            
          </div>

          <div className="input-group">
            <button type="submit" className="buttonRegister" onClick={() => salvar()}> CADASTRAR </button>
          </div>

        </form>

      </div>

      <div className="whatsapp-icon">
        <a href="https://api.whatsapp.com/send?phone=5581995150302" target="_blank" rel="noopener noreferrer">
          <img src={whatsapp} alt="WhatsApp"/>
        </a>
      </div>    

      {/* Usando o componente BottomReturn */}
      <div>
        <ButtonReturn />
      </div>

    </>

  );

}
