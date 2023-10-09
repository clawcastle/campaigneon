import { useAuth0 } from "@auth0/auth0-react"

export const HomePage = () => {
    const { loginWithRedirect } = useAuth0();
    return (<>
        <h2>Welcome to Campaigneon. Login to proceed.</h2>

        <div>
            <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
    </>)
}