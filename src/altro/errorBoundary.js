import { SomethingWentWrong } from "../pagine/somethingWentWrong";
import React, { useContext } from "react";
import { MsgContext } from '../tema/MsgContext'




class ErrorBoundary extends React.Component {
    state = {
      hasError: false,
      error: { message: '', stack: '' },
      info: { componentStack: '' }
    };
  
    static getDerivedStateFromError = error => {
const  { msg, setmess }  = useContext(MsgContext);

      console.log("c'e' errorre")
      setmess({
        stile:'rosso',
        titolo:'errore',
        mess:error
      })
      return { hasError: true };
    };
  
    componentDidCatch = (error, info) => {
const  { msg, setmess }  = useContext(MsgContext);

      console.log("c'e' errorre2")
      setmess({
        stile:'rosso',
        titolo:'errore',
        mess:error
      })
      this.setState({ error, info });
    };
  
    render() {
      const { hasError, error, info } = this.state;
      const { children } = this.props;
  
      return hasError ? <SomethingWentWrong/> : children;
    }
  }

export default ErrorBoundary;
