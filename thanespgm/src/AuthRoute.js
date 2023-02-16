import { getUser } from "./utils/Authorize";
import { Redirect,Route } from "react-router-dom";

const AuthRoute=({component:Component,...rest})=>(
  <Route
    {...rest}
    render={props=>
      getUser() ? (<Component {...props} />) : (<Redirect to={{pathname:"/login",state:{from:props.location}}} />)
    }
  />
)

export default AuthRoute;