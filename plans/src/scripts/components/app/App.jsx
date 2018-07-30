import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyD1_0Q2nPzjoJ40mvwXMFMidMBTKDjzvn0",
  authDomain: "my-extension-6d063.firebaseapp.com",
  databaseURL: "https://my-extension-6d063.firebaseio.com",
  projectId: "my-extension-6d063",
  storageBucket: "my-extension-6d063.appspot.com",
  messagingSenderId: "935857002917"
};
firebase.initializeApp(config);
const db = firebase.database();
const appTokenKey = "appToken";

const boxStyle = {
  "float": "left",
  "width":200,
  "height":200,
  "margin":30,
  "textAlign":"center",
  "borderStyle":"solid",
  "borderWidth":2,
  "borderColor":"black",
  "padding":20,
  "backgroundColor":"#d6d6d6"
};
const parentBoxStyle = {
  "width":700,
  "marginTop":0,
  "marginBottom":0,
  "marginLeft":"auto",
  "marginRight":"auto",
  "clear":"both"
}
const planWrapStyle = {
  "width":150,
  "height":150,
  "fontSize":22,
  "fontWeight":300,
  "lineHeight":7,
  "backgroundColor":"white",
  "color":"black",
  "marginTop":0,
  "marginBottom":0,
  "marginLeft":"auto",
  "marginRight":"auto",
  "textAlign":"center",
  "textTransform":"uppercase"
}
const currentPlanStyle = {
  "width":150,
  "height":150,
  "fontSize":22,
  "fontWeight":300,
  "lineHeight":7,
  "backgroundColor":"white",
  "color":"green",
  "marginTop":0,
  "marginBottom":0,
  "marginLeft":"auto",
  "marginRight":"auto",
  "textAlign":"center",
  "textTransform":"uppercase"
}
const selButtonStyle = {
  "marginTop":10
}
const currentLabel = {
  "textTransform":"uppercase",
  "textAlign":"center",
  "fontColor":"black",
  "fontSize":18,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUpgrade = this.handleUpgrade.bind(this);
  }

  componentDidMount() {
    // document.addEventListener('click', () => {
    //   this.props.dispatch({
    //     type: 'ADD_COUNT'
    //   });
    // });
  }

  handleUpgrade() {
    let id = localStorage.getItem(appTokenKey);
    if(this.props.current_user.userinfo) {
      db.ref('users/'+id).update({
        accType:"pro",
      })
      .then(() => {
        alert("Account has been updated");
      })
      .catch(error => {
        console.log(error);
        console.log("Error Occured");
      });
    } else {
      alert("Outside");
    }
  }

  render() {
    // console.log(this.props.current_user.userinfo);
    let upgradePlan = "";
    let selButton = "";
    if(this.props.current_user.userinfo.accType == "free") {
      upgradePlan = "pro"
      selButton = <button style={selButtonStyle} onClick={this.handleUpgrade}>Select</button>
    } else {
      upgradePlan = "free"
    }
    return (
      <div style={parentBoxStyle}>
        <div style={boxStyle}><p style={currentPlanStyle}>{this.props.current_user.userinfo.accType}</p><p style={currentLabel}>current</p></div>
        <div style={boxStyle}><p style={planWrapStyle}>{upgradePlan}</p>{selButton}</div>
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

export default connect(mapStateToProps)(App);