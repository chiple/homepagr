import {useState} from "react"
import test from "./lib/markdown"

function Note(props: any){

    const getRaw = async(url: string) =>{
        const rawTxt = await fetch(url,
        { headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        return rawTxt;
    }

    const [ PageContent, setPageContent ] = useState("")
    const fname = /texts\/.*$/g.exec(props.url);
    if(fname!=null){
        let fnameString = fname[0].toString()
        getRaw(fnameString).
            then((obj)=>{
                return obj.text()}).
            then((txt)=>{
                setPageContent(txt)
            })
        console.log(PageContent)
    }

    return(
        <div>
            {test(PageContent)}
        </div>

    )
    }


export default Note;
