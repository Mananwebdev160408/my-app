export default function profile({params}){
    return(
        <div
        className="bg-black w-screen h-screen flex justify-center items-center"
        >
            <h1 className="text-4xl text-white" >Profile {params.id}</h1>
        </div>
    )
}