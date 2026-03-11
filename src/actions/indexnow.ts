export async function submitToIndexNow(urls: string[]) {
    const endpoint = "https://api.indexnow.org/indexnow"

    const body = {
        host: process.env.NEXT_PUBLIC_SITE_URL,
        key: process.env.INDEXNOW_KEY,
        keyLocation: `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.INDEXNOW_KEY}.txt`,
        urlList: urls
    }

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    console.log(response)
}