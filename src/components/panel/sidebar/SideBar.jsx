import React from 'react'
import EditMessage from '../edit-message/EditMessage'

const SideBar = (props) => {
    const { isSelected, textRef, nodeName, setNodeName } = props;
    const onDragStart = (e, nodeType, content) => {
        e.dataTransfer.setData("application/reactflow", nodeType);
        e.dataTransfer.setData("content", content);
        e.dataTransfer.effectAllowed = "move";
    };
    return (
        <aside className='sidebar'>
            {isSelected ? (
                <EditMessage
                    textRef={textRef}
                    nodeName={nodeName}
                    setNodeName={setNodeName}
                />
            ) : (
                <div
                    style={{ width: 'fit-content', padding: '12px', border: '1px solid green', borderRadius: '8px', color: 'green' }}
                    onDragStart={(e) => onDragStart(e, "node", "message")}
                    draggable
                >
                    Message Node
                </div>
            )}
        </aside>
    )
}

export default SideBar