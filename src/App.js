import {Route, Switch} from "react-router";
import {LayoutComponent} from "./components/layout.component";
import {HomeScreen} from "./screens/home.screen";
import {CompanyDetailScreen} from "./screens/company.detail.screen";
import {CompanyCreateScreen} from "./screens/company.create.screen";
import {LoginScreen} from "./screens/login.screen";
import {RegisterScreen} from "./screens/register.screen";
import {JobPostDetailScreen} from "./screens/job.post.detail.screen";

function App() {
    return (
        <LayoutComponent>
            <Switch>
                <Route path="/" exact component={HomeScreen}/>
                <Route path="/company/create" exact component={CompanyCreateScreen} />
                <Route path="/company-detail/:id" component={CompanyDetailScreen}/>
                <Route path="/company/:companyId/job/:jobId" component={JobPostDetailScreen} />

                <Route path="/auth/login" component={LoginScreen} />
                <Route path="/auth/register" component={RegisterScreen} />
            </Switch>
        </LayoutComponent>
    );
}

export default App;
