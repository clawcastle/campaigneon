export async function onExecutePostUserRegistration(event, api) {
    const campaigneon_url = event.secrets.CAMPAIGNEON_URL
    const campaigneon_secret = event.secrets.CAMPAIGNEON_SECRET

    const requestBody = {
        id: event.user.user_id,
        email: event.user.email ?? "",
        display_name: event.user.nickname ?? ""
    }

    await fetch(`${campaigneon_url}/url`, {
        method: "POST",
        headers: {
            secret: campaigneon_secret
        },
        body: JSON.stringify(requestBody)
    })
}
