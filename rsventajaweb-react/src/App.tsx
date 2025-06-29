import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCar, faHome, faArrowUp, faHeartbeat, faBuilding, faBriefcase, faMobileAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import ControlPanel from './ControlPanel';

function Homepage() {
  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="#sobre">Quem somos</a></li>
            <li className="nav-item"><a className="nav-link" href="#produtos">Produtos</a></li>
            <li className="nav-item"><a className="nav-link" href="#seguradoras">Seguradoras</a></li>
            <li className="nav-item"><a className="nav-link" href="#contato">Contato</a></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Painel de Controle</Link></li>
          </ul>
        </div>
      </nav>
      {/* Header */}
      <div className="d-flex justify-content-center align-items-center position-relative" style={{ height: 220 }}>
        <img alt="RS Ventaja" className="logobig" src={process.env.PUBLIC_URL + '/rsventajaheader.png'} width="200" height="200" style={{ position: 'absolute' }} />
      </div>
      {/* Main Content */}
      <main className="d-flex flex-column align-items-center">
        {/* Quem somos */}
        <section id="sobre" className="my-5 w-100 d-flex flex-column align-items-center">
          <div className="title h3 mb-3">Quem somos</div>
          <div className="abouttext text-center" style={{ maxWidth: 600 }}>
            No mercado há 20 anos, trabalhamos com atenção especial às necessidades individuais do cliente. Temos orgulho em
            construir relações de confiança, possuindo clientes satisfeitos pelo nosso atendimento personalizado e bem
            amparados pelas coberturas que oferecemos.
          </div>
        </section>
        {/* Produtos */}
        <section id="produtos" className="my-5 w-100 d-flex flex-column align-items-center">
          <div className="title h3 mb-4">Produtos</div>
          <div className="row w-100 justify-content-center">
            <div className="col-md-2 col-12 mb-4 d-flex flex-column align-items-center">
              <div className="subtitle h5">Seguro de Automóvel</div>
              <FontAwesomeIcon icon={faCar} size="3x" className="mb-2" />
              <p className="subtitledesc">Cobertura e assistência 24h</p>
              <a href="https://wwws.portoseguro.com.br/vendaonline/automovel/home.ns?cod=3f559c36a4824742a4b2ce6c6ca42463&utm_source=43254J&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_AIQ7YJ&utm_content=RS_VENTAJA_CORRETORA_DE_SEGUROS_LTDA&origem=Site" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary">Faça uma cotação</button>
              </a>
            </div>
            <div className="col-md-2 col-12 mb-4 d-flex flex-column align-items-center">
              <div className="subtitle h5">Seguro Residencial</div>
              <FontAwesomeIcon icon={faHome} size="3x" className="mb-2" />
              <p className="subtitledesc">...também para sua casa!</p>
              <a href="https://wwws.portoseguro.com.br/vendaonline/residencia/home.ns?cod=b316cc04aab441c2b853e91f7c31b6fe&utm_source=43254J&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_AIQ7YJ&utm_content=RS_VENTAJA_CORRETORA_DE_SEGUROS_LTDA&origem=Site" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary">Faça uma cotação</button>
              </a>
            </div>
            <div className="col-md-2 col-12 mb-4 d-flex flex-column align-items-center">
              <div className="subtitle h5">Seguro Empresarial</div>
              <FontAwesomeIcon icon={faBuilding} size="3x" className="mb-2" />
              <p className="subtitledesc">...e sua empresa!</p>
              <a href="#contato">
                <button className="btn btn-primary">Faça uma cotação</button>
              </a>
            </div>
            <div className="col-md-2 col-12 mb-4 d-flex flex-column align-items-center">
              <div className="subtitle h5">Responsabilidade Civil</div>
              <FontAwesomeIcon icon={faBriefcase} size="3x" className="mb-2" />
              <p className="subtitledesc">Pra quando tudo dá errado</p>
              <a href="#contato">
                <button className="btn btn-primary">Faça uma cotação</button>
              </a>
            </div>
            <div className="col-md-2 col-12 mb-4 d-flex flex-column align-items-center">
              <div className="subtitle h5">Seguro de Vida</div>
              <FontAwesomeIcon icon={faHeartbeat} size="3x" className="mb-2" />
              <p className="subtitledesc">Preocupação com a sua família</p>
              <a href="https://wwws.portoseguro.com.br/vendaonline/vidamaissimples/home.ns?cod=f4c49db5b36c4ad0a84c46770bdf1454&utm_source=43254J&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_AIQ7YJ&utm_content=RS_VENTAJA_CORRETORA_DE_SEGUROS_LTDA&origem=Site" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary">Faça uma cotação</button>
              </a>
            </div>
            <div className="col-md-2 col-12 mb-4 d-flex flex-column align-items-center">
              <div className="subtitle h5">Riscos Diversos</div>
              <FontAwesomeIcon icon={faMobileAlt} size="3x" className="mb-2" />
              <p className="subtitledesc">Seus equipamentos protegidos</p>
              <a href="https://wwws.portoseguro.com.br/vendaonline/equipamentosportateis/home.ns?cod=0ba8daaf22d945eea030713c4ce34678&utm_source=43254J&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_AIQ7YJ&utm_content=RS_VENTAJA_CORRETORA_DE_SEGUROS_LTDA&origem=Site" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary">Faça uma cotação</button>
              </a>
            </div>
          </div>
        </section>
        {/* Seguradoras */}
        <section id="seguradoras" className="my-5 w-100 d-flex flex-column align-items-center">
          <div className="title h3 mb-4">Seguradoras</div>
          <div className="row w-100 justify-content-center">
            {[
              { name: 'Porto Seguro', img: 'porto.jpg', url: 'https://www.portoseguro.com.br/' },
              { name: 'Unimed', img: 'unimed.jpg', url: 'https://www.segurosunimed.com.br/' },
              { name: 'Mapfre', img: 'mapfre.png', url: 'https://www.mapfre.com.br/' },
              { name: 'Azul', img: 'azul.jpg', url: 'https://www.azulseguros.com.br/' },
              { name: 'HDI', img: 'hdi.jpg', url: 'https://www.hdiseguros.com.br/' },
              { name: 'SulAmérica', img: 'sulamerica.png', url: 'https://portal.sulamericaseguros.com.br/' },
              { name: 'Itaú', img: 'itau.png', url: 'https://www.itau.com.br/seguros/' },
              { name: 'Tokio Marine', img: 'tokiomarine.png', url: 'https://www.tokiomarine.com.br/' },
              { name: 'Sompo', img: 'sompo.png', url: 'https://sompo.com.br/' },
            ].map((insurer, idx) => (
              <div key={insurer.name} className="col-md-2 col-4 mb-4 d-flex flex-column align-items-center">
                <a href={insurer.url} target="_blank" rel="noopener noreferrer">
                  <img alt={insurer.name} src={process.env.PUBLIC_URL + '/' + insurer.img} className="img-circle mb-2" width="60" height="60" />
                </a>
                <p>{insurer.name}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Contato */}
        <section id="contato" className="my-5 w-100 d-flex flex-column align-items-center">
          <div className="title h3 mb-3">Contato</div>
          <div className="d-flex flex-column align-items-center">
            <p>Roberto Ventaja</p>
            <p style={{ color: 'grey' }}>Corretor de Seguros</p>
            <p>roberto@rsventaja.com <a href="mailto:roberto@rsventaja.com"><FontAwesomeIcon icon={faEnvelope} style={{ color: 'grey' }} /></a></p>
          </div>
          <a href="#" title="To Top">
            <FontAwesomeIcon icon={faArrowUp} size="2x" style={{ color: 'grey' }} />
          </a>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/controlpanel" element={<ControlPanel />} />
        <Route path="/" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
