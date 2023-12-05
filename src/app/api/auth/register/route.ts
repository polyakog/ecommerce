const POST =async (request: Request) => {

    try {
        const {email, password} = await request.json()
        // валидация email и password
        console.log({email, password})
        
    } catch (error) {
        console.log({error})
        
    }
    
}



export default POST