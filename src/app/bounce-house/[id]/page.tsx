export default function Item({params} : {
    params: {id:string}
}) {
    return <h1 className="text-black">ID: {params.id}</h1>
}