import { useAuth0 } from "@auth0/auth0-react"
import { AuthGuard } from "../components/common/AuthGuard";
import { Page } from "./Page";

const HomePageUnauthenticated = () => {
    const { loginWithRedirect } = useAuth0();

    return (<>
        <h2>Welcome to Campaigneon. Login to proceed.</h2>

        <div>
            <button onClick={() => loginWithRedirect()}>Login</button>
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