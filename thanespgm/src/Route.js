import { BrowserRouter, Switch,Route } from "react-router-dom"
import AuthRoute from "./AuthRoute"
import Main from "./pages/Main"
import CreatePlan from "./pages/CreatePlan"
import Login from "./pages/Login"
import User from "./pages/User"
import Location from "./pages/Location"
import DetailPlan from "./pages/DetailPlan"

const route = ()=>{
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <AuthRoute path="/" exact component={Main} />
        <AuthRoute path="/createreport" exact component={CreatePlan} />
        <AuthRoute path="/user" exact component={User} />
        <AuthRoute path="/location" exact component={Location} />
        <AuthRoute path="/detailplan/:planID" exact component={DetailPlan} />
      </Switch>
    </BrowserRouter>
  )
}

export default route