import React, { useState, useEffect } from "react";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();

    //eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const response = await fetch("/logs");
    const data = await response.json();

    setLogs(data);
    setLoading(false);
  };

  if (loading) {
    return <h4>Carregando...</h4>;
  }

  return (
    <ul className='collection-with-header'>
      <li className='collection-header'>
        <h4 className='center'>Logs do Sistema</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'> Nenhum log para exibir...</p>
      ) : (
        logs.map(log => <li>{log.message}</li>)
      )}
    </ul>
  );
};

export default Logs;
