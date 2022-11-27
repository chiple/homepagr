import React,
{ useState, useEffect, useRef, useMemo } from 'react';
import VisGraph, {
    GraphData,
    GraphEvents,
    Options,
} from 'react-vis-graph-wrapper';
import { ModalContext } from "./modalContext";
import { useContext } from "react";
import { useDisclosure, Box } from '@chakra-ui/react'

function Graphh() {
    const [ modalGraphState, setModalGraphState ] = useContext<any>(ModalContext);

    const updateOpenFlag = (flg: boolean) =>{
        setModalGraphState({
            ...modalGraphState,
            sidebarIsOpen:flg? false : true
        })
    }

    const onToggleSidebarHandler = (url: string) => {
        if (modalGraphState.sidebarIsOpen) {
            setModalGraphState({
                    ...modalGraphState,
                    currentUrl: url,
                    sidebarIsOpen:false
            })

            onClose();
            updateOpenFlag(true);

        } else {
            console.log(url)
onOpen();
            updateOpenFlag(false);

            setModalGraphState({
                    ...modalGraphState,
                    sidebarIsOpen:true,
                    currentUrl: url,
            }
            )
                        };

    };

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return { width, height };
    }

    const networkRef = useRef<any>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    let justOnce = true
    const [graphState, setGraphState] = useState({
        counter : 5,
        graph :{ nodes: [], edges: []},
        events :{
            selectNode: (event: any) => {
                let { nodes, edges } = event;
                if(justOnce){
                    justOnce=false
                    networkRef.
                        current.
                        focus(nodes,
                              {animation: {duration : 1500,
                                           easingFunction: 'linear'},
                              offset: {x: -windowDimensions['width']/4, y:0}})
                }else{
                    networkRef.
                        current.
                        focus(nodes,
                              {animation: {duration : 1500,
                                           easingFunction: 'linear'}})
                };
                getUrlFromNodeID(nodes).then((url)=>{

                    onToggleSidebarHandler(url)
                })

            },
            doubleClick: ({ nodes, edges }: {nodes: any, edges: any}) =>{
                alert("double clicked");
            }
        }
    }
                                                     )
    function randomColor() {
        const red = Math.
            floor(Math.random() * 256).
            toString(16).padStart(2, '0');
        const green = Math.floor(Math.random() * 256).
            toString(16).
            padStart(2, '0');
        const blue = Math.
            floor(Math.random() * 256).
            toString(16).
            padStart(2, '0');
        return `#${red}${green}${blue}`;
    }

        const zoomToNode = (node:any)=> {
        let quoter = windowDimensions['width'] / 4;
        networkRef.
            current.
            focus(node,
                  {animation: {duration : 1500,
                               easingFunction: 'linear'}},
                  {offset: {x: -quoter, y: 0}})
    }

    const getUrlFromNodeID = async(nodeid : string)=>{
        const response = await fetch(`texts/nodes.json`,
                                     {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const member = await response.json();

        return member[nodeid][0];
    }

    const LoadJsonToGraph = async(filename : string) =>{
        const response = await fetch(`texts/${filename}.json`,
                                     {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const member = await response.json();

        switch(filename){
            case "nodes":
                for(let i in member){
                    setGraphState(({ graph: { nodes, edges }, counter, ...rest }: any) => {
                        const title = member[i][1];
                        const id = i;
                        const label = title
                        const url =   member[i][0];
                        const color = randomColor()
                        return {
                            graph: { nodes: [...nodes,
                                             { id, label, title, color, url }],
                                     edges: [...edges,]},
                            ...rest
                        }
                    });}
                break;

            case "links":
                Object.keys(member).forEach((key)=>{
                    //start is just one but the end can be multiple.
                    const friends = member[key]
                    for(let index in friends){
                        const start = key
                        const end = friends[index]
                        setGraphState(({ graph: { nodes, edges }, counter, ...rest }: any) => {
                            return {
                                graph: {
                                    nodes: [...nodes],
                                    edges: [...edges, { from: start, to: end }]
                                },
                                ...rest
                            }})}})
                break;
        }
    }
    const { graph, events } = graphState;

    const options : Options = {
        interaction: {hover: true,
                      keyboard: true},
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#ffff00",
            arrows: {
                to:{
                    enabled: false,
                }
            }
        },
        height: `${windowDimensions['height']-50}`,
        nodes: {
            size: 8,
            shape: "dot",
            font: {color: '#ffffff', size:20},
        },
        
    };

    useEffect(()=>{
        LoadJsonToGraph("nodes");
        LoadJsonToGraph("links");
        function handleResize() {
            setWindowDimensions(getWindowDimensions())

            networkRef.current.fit({maxZoomLevel: 2,
                                    animation: {duration : 1500,
                                                easingFunction: 'linear'}})}

        //for responsive thing.
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])

    //useEffect(()=>{
    //},[modalGraphState.sidebarIsOpen])

        return (
        <Box
        w={modalGraphState.sidebarIsOpen ? `${modalGraphState.mainWidth}%` : "100%"}
        borderWidth='1px'
        borderRadius='12'
        overflow='hidden'
        m={[1, 1]}
            >
            <VisGraph
        graph={graph}
        options={options}
        events={events}
        ref={networkRef}
            />
            </Box>
    );
}

export default Graphh;
