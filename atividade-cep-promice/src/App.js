import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';

function App() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [cepsSalvos, setCepsSalvos] = useState([]);


  useEffect(() => {
    const fetchCepsSalvos = async () => {
      try {
        const res = await fetch("http://localhost:5000/Ceps");
        const data = await res.json();
        setCepsSalvos(data);
      } catch (error) {
        console.log("Erro ao buscar CEPs salvos:", error);
      }
    };

    fetchCepsSalvos();
  }, []);


  const consultarCEP = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      setErro('CEP inválido! Deve conter 8 dígitos numéricos.');
      setResultado(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/consultar-cep/${cepLimpo}`);
      const data = await response.json();

      if (data.error) {
        setErro(data.error);
        setResultado(null);
      } else {
        setErro('');
        setResultado(data);
        salvarCEP(data);
      }
    } catch (err) {
      setErro('Erro ao consultar o CEP!');
      setResultado(null);
    }
  };


  const salvarCEP = async (dados) => {

    const cepJaSalvo = cepsSalvos.some((item) => item.cep === dados.cep);

    if (cepJaSalvo) {
      console.log("CEP já salvo anteriormente.");
      return;
    }

    const id = Math.random().toString(16).slice(2, 6);
    const novoCep = { ...dados, id };

    await fetch("http://localhost:5000/Ceps", {
      method: "POST",
      body: JSON.stringify(novoCep),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCepsSalvos((prev) => [...prev, novoCep]);
  };


  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/Ceps/${id}`, {
      method: "DELETE",
    });

    setCepsSalvos((prev) => prev.filter((cep) => cep.id !== id));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Consulta CEP</h1>
      </header>

      <div className="form-control">
        <label htmlFor="cep">Digite o CEP:</label>
        <input
          type="text"
          id="cep"
          placeholder="Ex: 13466-902"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && consultarCEP()}
        />
        <button onClick={consultarCEP}>Consultar</button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {resultado && (
        <div className="resultado">
          <p><strong>CEP:</strong> {resultado.cep}</p>
          <p><strong>Rua:</strong> {resultado.street}</p>
          <p><strong>Bairro:</strong> {resultado.neighborhood}</p>
          <p><strong>Cidade:</strong> {resultado.city}</p>
          <p><strong>Estado:</strong> {resultado.state}</p>
        </div>
      )}

      <div className="list-ceps">
        <h2>Lista de CEPs Consultados:</h2>
        {cepsSalvos.length === 0 ? (
          <p>Não há CEPs cadastrados</p>
        ) : (
          cepsSalvos.map((cepItem) => (
            <div className="cep-item" key={cepItem.id}>
              <h3>{cepItem.cep}</h3>
              <p>{cepItem.street}, {cepItem.neighborhood}</p>
              <p>{cepItem.city} - {cepItem.state}</p>
              <BsTrash onClick={() => handleDelete(cepItem.id)} style={{ cursor: 'pointer', color: 'red' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
