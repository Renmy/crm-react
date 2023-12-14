export async function getClients () {
    const response = await fetch(import.meta.env.VITE_API_URL)
    const result = await response.json()
    return result
}
export async function getClient (id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await response.json()
    return result
}

export async function updateClient (id, client) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(client), 
            headers: { 'Content-Type': 'application/json'}
        })
        await response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function addClient(client) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(client), 
            headers: { 'Content-Type': 'application/json'}
        })
        await response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function deleteClient(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })
        await response.json()
    } catch (error) {
        console.error(error)
    }
}