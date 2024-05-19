import React, { useCallback, useEffect, useState, useRef } from "react";
import './ReactFlowCanvas.css';
import 'reactflow/dist/style.css';
import MessageNode from '../nodes/message-node/MessageNode';
import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider
} from "reactflow";
import SideBar from '../panel/sidebar/SideBar';
import { checkForConnectedNodes } from "../../utils/react-flow";

let id = 0;
const getId = () => `node_${id++}`;

const nodeTypes = { node: MessageNode };

const ReactFlowCanvas = () => {
    const [saveMessage, setSaveMessage] = useState('');
    const flowWrapper = useRef(null);
    const textRef = useRef(null);
    const [flowInstance, setflowInstance] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const onInit = (flowInstance) => setflowInstance(flowInstance);

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const onDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("application/reactflow");
        const label = e.dataTransfer.getData("content");
        const mousePosition = { x: e.clientX, y: e.clientY };
        const position = flowInstance.screenToFlowPosition(mousePosition);
        const newNode = {
            id: getId(),
            type,
            position,
            data: { heading: "Message node", content: label }
        };
        setNodes((preventv) => preventv.concat(newNode));
        setSelectedNode(newNode.id);
    };
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
            ),
        [setEdges]
    );

    const [nodeName, setNodeName] = useState("Node 1");

    const saveHandler = () => {
        if (checkForConnectedNodes(nodes, edges)) {
            setSaveMessage("saved successfully");
            setIsSelected(false)
        }
        else {
            setSaveMessage("Unable to save")
        }
        setTimeout(() => {
            setSaveMessage('');
        }, 4000);
    };

    useEffect(() => {
        setNodeName(selectedNode?.data?.content || selectedNode);
    }, [selectedNode]);

    useEffect(() => {
        const node = nodes.filter((node) => {
            if (node.selected) return true;
            return false;
        });
        if (node[0]) {
            setSelectedNode(node[0]);
            setIsSelected(true);
        } else {
            setSelectedNode("");
            setIsSelected(false);
        }
    }, [nodes]);


    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode?.id) {
                    node.data = {
                        ...node.data,
                        content: nodeName || " "
                    };
                }
                return node;
            })
        );
    }, [nodeName, setNodes]);



    return (
        <>
            <div className="save-btn">
                <span style={{ color: '#fff', padding: '4px', marginLeft: '8px' }}>Chat flow</span>
                <div>
                    <span style={{ marginRight: '12px', color: 'red' }}>{saveMessage}</span>
                    <button onClick={saveHandler} style={{ border: '1px solid orange', background: 'orange', color: 'white', padding: '4px' }}>Save changes</button>
                </div>
            </div>
            <div className="flow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={flowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={onInit}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            attributionPosition="top-right"
                        >
                            <Background color="#aaa" gap={16} />
                        </ReactFlow>
                    </div>
                    <SideBar
                        isSelected={isSelected}
                        textRef={textRef}
                        nodeName={nodeName}
                        setNodeName={setNodeName}
                    />
                </ReactFlowProvider>
            </div>
        </>
    )
}

export default ReactFlowCanvas