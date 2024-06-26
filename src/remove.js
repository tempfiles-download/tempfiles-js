export async function remove({params}) {
    const {id, password} = params;
    const file = await R2.get(id)
    if (file) {
        const {deletion} = file.customMetadata
        if (deletion === password) {
            await R2.delete(id);
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Methods': 'GET,DELETE,OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            }
    }
    return new Response(JSON.stringify({error: 'Wrong ID or Deletion Password'}), {
        status: 404,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Methods': 'GET,DELETE,OPTIONS',
            'Access-Control-Allow-Origin': '*'
        }
    })
}
