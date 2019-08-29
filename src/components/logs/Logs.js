import React, { useState, useEffect } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preolader";

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
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>Logs do Sistema</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'> Nenhum log para exibir...</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

export default Logs;
