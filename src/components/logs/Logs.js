import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LogItem from "./LogItem";
import Preloader from "../layout/Preolader";
import { getLogs } from "../../actions/logActions";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();

    //eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
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

const mapStateToProps = state => ({
  log: state.log
});

Logs.propTypes = {
  log: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
