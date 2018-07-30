import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {updateUser} from '../../../../../event/src/actions';

const config = {
  apiKey: "AIzaSyD1_0Q2nPzjoJ40mvwXMFMidMBTKDjzvn0",
  authDomain: "my-extension-6d063.firebaseapp.com",
  databaseURL: "https://my-extension-6d063.firebaseio.com",
  projectId: "my-extension-6d063",
  storageBucket: "my-extension-6d063.appspot.com",
  messagingSenderId: "935857002917"
};
firebase.initializeApp(config);
const googleProvider = new firebase.auth.GoogleAuthProvider();
const firebaseAuth = firebase.auth;
const db = firebase.database();
const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const googleUserName = "Name";
const divStyle = {
  width: 200
};
const infStyle = {
  "marginBottom": 30,
  "textAlign":"center"
};
const accStyle = {
  "textAlign":"center"
};
const logoutBtnStyle = {
  "marginLeft": 20
};

const doCreateUser = (id, username, email, accType) =>
  db.ref('users/'+id).set({
    username,
    email,
    accType,
  });

const onceGetUsers = (token) =>
  db.ref('users/'+token).once('value');

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.state = {
      users: null,
    };
  }

  async componentDidMount() {
    // document.addEventListener('click', () => {
    //   this.props.dispatch({
    //     type: 'ADD_COUNT'
    //   });
    // });
    const tk = localStorage.getItem(appTokenKey);
    if(tk) {
      onceGetUsers(tk).then(snapshot =>
        this.setState({ users: snapshot.val() }, () => {
          this.props.updateUser(this.state.users);
          // console.log(this.props.current_user);          
        })
      );
    }
  }

  componentWillMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
          // console.log("User signed in: ", JSON.stringify(user));
          localStorage.removeItem(firebaseAuthKey);

          // here you could authenticate with you web server to get the
          // application specific token so that you do not have to
          // authenticate with firebase every time a user logs in
          localStorage.setItem(appTokenKey, user.uid);
      }
    });
  }

  handleClick() {
    firebase.auth().signInWithPopup(googleProvider).then(function(result) {        
      var token = result.credential.accessToken;
      var user = result.user;
      // localStorage.setItem(googleUserName, user.displayName);
      doCreateUser(result.user.uid, result.user.displayName, result.user.email, "free")
      .then(() => {
        alert("Account has been created");
      })
      .catch(error => {
        console.log(error);
        console.log("Error Occured");
      });
    }).catch(function(error) {
      // Handle Errors here.
      localStorage.removeItem(firebaseAuthKey);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    localStorage.setItem(firebaseAuthKey, "1");
  }

  handleLogout() {
    localStorage.removeItem(appTokenKey);
    localStorage.removeItem(googleUserName);
    firebase.auth().signOut().then(function() {
      alert("Successfully logged out");
    }).catch(function(error) {
      // An error happened.
    });
  }

  handleAccount() {
    chrome.tabs.create({url: 'plans.html'});
    // let id = localStorage.getItem(appTokenKey);
    // const {users} = this.state;
    // if(users) {
    //   db.ref('users/'+id).update({
    //     accType:"pro",
    //   })
    //   .then(() => {
    //     alert("Account has been updated");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     console.log("Error Occured");
    //   });
    // }
  }

  render() {
    let button;
    let inf;
    let acc;
    let name;
    let accTy;
    const {users} = this.state;
    // console.log(this.props.current_user);
    if (localStorage.getItem(firebaseAuthKey) === "1") {
      button = <div><h2>Member Login</h2><button id="clickLogin" onClick={this.handleClick}>Login with google</button></div>;
    } else {
      if (localStorage.getItem(appTokenKey)) {        
        if(users) {
          // console.log(users.accType);
          accTy = users.accType;
          name = users.username;
          inf = <div style={infStyle}><strong>Welcome</strong><p>{name}</p></div>;
          acc = <div style={infStyle}><strong>Account Type</strong><p>{accTy}</p></div>;
          // button = <button id="clickLogout" onClick={this.handleLogout}>Logout</button>;
          button = <p style={accStyle}><button id="clickAccount" onClick={this.handleAccount}>Upgrade to Pro!</button><button id="clickLogout" style={logoutBtnStyle} onClick={this.handleLogout}>Logout</button></p>;
        } else {
          button = "Loading...";
        }
      } else {
        // console.log("Else IF");
        button = <div><h2>Member Login</h2><button id="clickLogin" onClick={this.handleClick}>Login with google</button></div>;
      }
    }
    return (
      <div style={divStyle}>
        <div>{inf}</div><div>{acc}</div>{button}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     count: state.count
//   };
// };

const mapStateToProps = (state) => {
  return {
    current_user: state.cuser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (text) => dispatch(updateUser(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App