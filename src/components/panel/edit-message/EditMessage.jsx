import React from 'react'

const EditMessage = (props) => {
    const { textRef, nodeName, setNodeName } = props;
    return (
        <div className="controls_node">
            <label>Enter text</label>
            <textarea
                ref={textRef}
                value={nodeName}
                onChange={(evt) => setNodeName(evt.target.value)}
            />
        </div>
    )
}

export default EditMessage