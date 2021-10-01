import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchUser } from './redux/ActionCreators';
import Main from './components/Main';

//mapping redux store state to app props
const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser())
})

const App=()=>{
    return (
      <Provider store={configureStore()}>
        <Router>
        <Main/>
        </Router>
      </Provider>
    );
}

export default App;