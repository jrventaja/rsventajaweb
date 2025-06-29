import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Mock data and functions
const mockPolicies = [
  { id: 1, customer_name: 'João Silva', detail: 'Seguro Auto', start_date: '2024-06-01', end_date: '2024-07-01', calculated: false, insurer: 'Porto Seguro', file_name: 'mock.pdf' },
  { id: 2, customer_name: 'Maria Souza', detail: 'Seguro Vida', start_date: '2024-05-15', end_date: '2024-06-20', calculated: true, insurer: 'SulAmérica', file_name: 'mock2.pdf' },
];
const mockInsurers = [
  { id: 1, name: 'Porto Seguro' },
  { id: 2, name: 'SulAmérica' },
  { id: 3, name: 'Mapfre' },
];

function calculateDays(endDate: string) {
  const nowDate = new Date();
  const end = new Date(endDate);
  return Math.floor((end.getTime() - nowDate.getTime()) / 1000 / 60 / 60 / 24);
}
function fileUrl(fileName: string) {
  return `https://policiesrsventaja.s3-sa-east-1.amazonaws.com/${fileName}`;
}

const ControlPanel: React.FC = () => {
  const [signedin, setSignedin] = useState(false);
  const [policies, setPolicies] = useState(mockPolicies);
  const [queryCurrent, setQueryCurrent] = useState('');
  const [queryCurrentResult, setQueryCurrentResult] = useState<typeof mockPolicies>([]);
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState<typeof mockPolicies>([]);
  const [insurers] = useState(mockInsurers);
  const [insertForm, setInsertForm] = useState({ name: '', insurer: '', additionalInfo: '', startDate: '', endDate: '', file: null as File | null });
  const [addingPolicy, setAddingPolicy] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayQueryCurrent, setDisplayQueryCurrent] = useState(false);
  const [displayQueryAll, setDisplayQueryAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check authentication
    setSignedin(true);
    // setSignedin(!!sessionStorage.getItem('Token'));
  }, []);

  // Tab 1: Due Policies
  const handleRenewalToggle = (id: number) => {
    setPolicies(policies => policies.map(p => p.id === id ? { ...p, calculated: !p.calculated } : p));
  };

  // Tab 2: Search Current Policies
  const handleQueryCurrentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryCurrent) {
      setDisplayQueryCurrent(true);
      return;
    }
    setDisplayQueryCurrent(false);
    setQueryCurrentResult(policies.filter(p => p.customer_name.toLowerCase().includes(queryCurrent.toLowerCase())));
    setQueryCurrent('');
  };

  // Tab 3: Search All Policies
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      setDisplayQueryAll(true);
      return;
    }
    setDisplayQueryAll(false);
    setQueryResult(policies.filter(p => p.customer_name.toLowerCase().includes(query.toLowerCase())));
    setQuery('');
  };
  const handleDelete = (id: number) => {
    setQueryResult(q => q.filter(p => p.id !== id));
  };

  // Tab 4: Register Policy
  const handleInsertChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInsertForm(f => ({ ...f, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInsertForm(f => ({ ...f, file: e.target.files![0] }));
    }
  };
  const handleInsertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddingPolicy(true);
    if (!insertForm.name || !insertForm.insurer || !insertForm.additionalInfo || !insertForm.startDate || !insertForm.endDate || !insertForm.file) {
      setDisplayAlert(true);
      setAddingPolicy(false);
      return;
    }
    setDisplayAlert(false);
    setTimeout(() => {
      setAddingPolicy(false);
      setDisplaySuccess(true);
      setInsertForm({ name: '', insurer: '', additionalInfo: '', startDate: '', endDate: '', file: null });
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1000);
  };

  if (!signedin) {
    return (
      <div className="container my-5 text-center">
        <h3>Você precisa estar autenticado para acessar o Painel de Controle.</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', background: '#fff' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="/homepage">Página Inicial</a></li>
          </ul>
        </div>
      </nav>
      <div className="d-flex justify-content-center align-items-center position-relative" style={{ height: 220 }}>
        <img alt="RS Ventaja" src={process.env.PUBLIC_URL + '/rsventajaheader.png'} width="200" height="200" style={{ position: 'absolute' }} />
      </div>
      <Tabs defaultActiveKey="due" className="mb-3 container mt-4">
        {/* Tab 1: Due Policies */}
        <Tab eventKey="due" title="Apólices a vencer">
          <div className="title h5 mb-3">Apólices com vencimento nos próximos 30 dias</div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Calculado?</th>
                <th>Dias Restantes</th>
                <th>Nome</th>
                <th>Seguradora</th>
                <th>Informações Adicionais</th>
                <th>Início</th>
                <th>Vencimento</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {policies.map(p => (
                <tr key={p.id}>
                  <td><Form.Check type="checkbox" checked={p.calculated} onChange={() => handleRenewalToggle(p.id)} /></td>
                  <td>{calculateDays(p.end_date)}</td>
                  <td>{p.customer_name}</td>
                  <td>{p.insurer}</td>
                  <td>{p.detail}</td>
                  <td>{new Date(p.start_date).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(p.end_date).toLocaleDateString('pt-BR')}</td>
                  <td><a className="btn btn-primary btn-sm" href={fileUrl(p.file_name)} target="_blank" rel="noopener noreferrer">Abrir</a></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        {/* Tab 2: Search Current Policies */}
        <Tab eventKey="current" title="Buscar apólices vigentes">
          {displayQueryCurrent && <Alert variant="warning" onClose={() => setDisplayQueryCurrent(false)} dismissible>Favor preencher o nome para realizar a busca.</Alert>}
          <div className="title h5 mb-3">Buscar apólices vigentes</div>
          <Form onSubmit={handleQueryCurrentSubmit} className="mb-3">
            <Form.Group className="mb-2" style={{ maxWidth: 400 }}>
              <Form.Label>Digite parte ou o nome do cliente</Form.Label>
              <Form.Control type="text" value={queryCurrent} onChange={e => setQueryCurrent(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">Buscar</Button>
          </Form>
          {queryCurrentResult.length > 0 && (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Dias Restantes</th>
                  <th>Nome</th>
                  <th>Seguradora</th>
                  <th>Informações Adicionais</th>
                  <th>Início</th>
                  <th>Vencimento</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {queryCurrentResult.map(p => (
                  <tr key={p.id}>
                    <td>{calculateDays(p.end_date)}</td>
                    <td>{p.customer_name}</td>
                    <td>{p.insurer}</td>
                    <td>{p.detail}</td>
                    <td>{new Date(p.start_date).toLocaleDateString('pt-BR')}</td>
                    <td>{new Date(p.end_date).toLocaleDateString('pt-BR')}</td>
                    <td><a className="btn btn-primary btn-sm" href={fileUrl(p.file_name)} target="_blank" rel="noopener noreferrer">Abrir</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        {/* Tab 3: Search All Policies */}
        <Tab eventKey="all" title="Buscar apólices">
          {displayQueryAll && <Alert variant="warning" onClose={() => setDisplayQueryAll(false)} dismissible>Favor preencher o nome para realizar a busca.</Alert>}
          <div className="title h5 mb-3">Buscar apólices</div>
          <Form onSubmit={handleQuerySubmit} className="mb-3">
            <Form.Group className="mb-2" style={{ maxWidth: 400 }}>
              <Form.Label>Digite parte ou o nome do cliente</Form.Label>
              <Form.Control type="text" value={query} onChange={e => setQuery(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">Buscar</Button>
          </Form>
          {queryResult.length > 0 && (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Seguradora</th>
                  <th>Informações Adicionais</th>
                  <th>Início</th>
                  <th>Vencimento</th>
                  <th>Abrir</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {queryResult.map(p => (
                  <tr key={p.id}>
                    <td>{p.customer_name}</td>
                    <td>{p.insurer}</td>
                    <td>{p.detail}</td>
                    <td>{new Date(p.start_date).toLocaleDateString('pt-BR')}</td>
                    <td>{new Date(p.end_date).toLocaleDateString('pt-BR')}</td>
                    <td><a className="btn btn-primary btn-sm" href={fileUrl(p.file_name)} target="_blank" rel="noopener noreferrer">Abrir</a></td>
                    <td><Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Excluir</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        {/* Tab 4: Register Policy */}
        <Tab eventKey="register" title="Cadastrar apólice">
          {displayAlert && <Alert variant="warning" onClose={() => setDisplayAlert(false)} dismissible>Favor preencher todos os campos antes de prosseguir!</Alert>}
          {displaySuccess && <Alert variant="success" onClose={() => setDisplaySuccess(false)} dismissible>Cadastro realizado com sucesso!</Alert>}
          <div className="title h5 mb-3">Cadastrar apólice</div>
          {addingPolicy && <div className="text-center my-3"><Spinner animation="border" variant="primary" /></div>}
          <Form onSubmit={handleInsertSubmit} className="mb-3">
            <Form.Group className="mb-2">
              <Form.Label>Nome do proponente</Form.Label>
              <Form.Control type="text" name="name" value={insertForm.name} onChange={handleInsertChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Seguradora</Form.Label>
              <Form.Select name="insurer" value={insertForm.insurer} onChange={handleInsertChange}>
                <option value="">Selecione</option>
                {insurers.map(ins => <option key={ins.id} value={ins.name}>{ins.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Informações adicionais</Form.Label>
              <Form.Control type="text" name="additionalInfo" maxLength={50} value={insertForm.additionalInfo} onChange={handleInsertChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Data de início de vigência</Form.Label>
              <Form.Control type="date" name="startDate" value={insertForm.startDate} onChange={handleInsertChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Data de fim de vigência</Form.Label>
              <Form.Control type="date" name="endDate" value={insertForm.endDate} onChange={handleInsertChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Arquivo PDF</Form.Label>
              <Form.Control type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileChange} />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={addingPolicy}>Cadastrar</Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ControlPanel; 