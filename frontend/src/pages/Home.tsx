import { useAuth0 } from "@auth0/auth0-react"
import { AuthGuard } from "../components/common/AuthGuard";
import { Page } from "./Page";
import { Button } from "@mui/material";

const HomePageUnauthenticated = () => {
    const { loginWithRedirect } = useAuth0();

    return (<>
        <h2>Welcome to Campaigneon. Login to proceed.</h2>

        <div>
            <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Login</Button>
        </div>
    </>)
}

const HomePageAuthenticated = () => {
    return (<AuthGuard>
        <Page>
            <div>logged in</div>
        </Page>
    </AuthGuard>)
}

export const HomePage = () => {
    const { isAuthenticated } = useAuth0();

    return (<>
        {isAuthenticated && <HomePageAuthenticated />}
        {!isAuthenticated && <HomePageUnauthenticated />}
    </>);
}