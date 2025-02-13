

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthPacienteService from "../../services/AuthPaciente.service.ts";
import { notifyError, notifySuccess } from "../../utils/Util.js";

import whatsapp from "../../assets/whatsapp.ico"; 

// Botão Returno - Ao clicar, redireciona para a página inicial (home)
import ButtonReturn from '../../components/buttonreturn/ButtonReturn';

// Importando a logomarca
import logo from '../../assets/startinfox.png'; // Ajuste o caminho conforme necessário

// Adicionando bibliotecas de ícones sociais
// import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Função para validar o e-mail
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Função para validar a senha (pelo menos 8 caracteres)
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação de campos
    if (!validateEmail(username)) {
      setErrorMessage('E-mail inválido');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    // Caso todas as validações passem
    setErrorMessage('');
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const  Login = async (event) => {
    event.preventDefault();

    let authData = {
      username,
      password,
    };

    try {
      const response = await AuthPacienteService.login(authData);
      notifySuccess("Usuário autenticado com sucesso!", response);
      navigate('/')
      // Aqui você pode redirecionar o usuário ou atualizar o estado
    } catch (err) {
      
      notifyError("Falha ao autenticar: " + err.message);
    }
    
  };

  const handleForgotPassword = () => {
    console.log('Redirecionar para página de recuperação de senha');
  };

  return (

    <>

      <div className="login-formulario">

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
            <p>Acesse a Sua Conta para continuar explorando os nossos conteúdos!</p>

          </div>

        </div>

        <form onSubmit={handleSubmit} className="formulary-login">

        <h3> FAÇA SEU LOGIN </h3>

          <div className="input-group">
            <label htmlFor="username">E-mail</label>
            <input
              type="text"
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
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Exibindo mensagens de erro */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="input-group">
            <button onClick={(event) => Login(event)} type="submit" className="buttonLogin">ENTRAR</button>
          </div>

          <div className="forgot-password">

            <button onClick={handleForgotPassword} className="forgot-password-btn">
              <p>Esqueceu a Senha?</p>
            </button>
            
          </div>

        </form>

        {/* Opções de login social
        
        <div className="social-login">

          <p>Ou CADASTRE-SE com</p>

          <div className="social-buttons">

            <button className="social-btn facebook">
              <FaFacebook /> Facebook
            </button>

            <button className="social-btn google">
              <FaGoogle /> Google
            </button>

          </div>

        </div> */}

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
