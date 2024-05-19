import React from "react";

import { Handle, Position } from "reactflow";

export const style = {
    body: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.2)",
        borderRadius: "8px 8px 8px 8px"
    },
    selected: {
        boxShadow: "0 8px 22px rgba(0,0,0,0.25), 0 12px 12px rgba(55,55,190,0.2)"
    },
    title: {
        padding: '8px',
        position: "relative",
        padding: "8px 32px",
        flexGrow: 1,
        backgroundColor: "light-blue",
        borderRadius: "8px 8px 0px 0px"
    },
    contentWrapper: {
        padding: "8px 0px",
        margin: '8px'
    }
};

const MessageNode = (props) => {
    const { data, selected } = props;
    let customTitle = { ...style.title };
    customTitle.backgroundColor = "#08c9bd";
    return (
        <div>
            <div style={{ ...style.body, ...(selected ? style.selected : []) }}>
                <div style={customTitle}>{data.heading}</div>
                <div style={style.contentWrapper}>{data.content}</div>
            </div>
            <Handle type="source" position={Position.Right} id="b" />
            <Handle type="target" position={Position.Left} id="a" />
        </div>
    )
}

export default MessageNode