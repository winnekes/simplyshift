import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditorModal from './EditorModal';

// todo Delete confirmation, delete failure handling
export default function ShiftModels(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="shift-models">
            <h3>your models</h3>
            <p>Select a shift and assign it to the calendar.</p>
            <nav>
                {props.models.map(model => (
                    <>
                        <Button
                            name=""
                            key={model.id}
                            style={{
                                backgroundColor: model.color,
                            }}
                        >
                            {model.name}
                        </Button>
                        <FaEdit
                            onClick={() => {
                                props.onSelectModel(model);
                                setModalShow(true);
                            }}
                        />
                        <FaTrash
                            onClick={() => {
                                props.deleteModel(model.id);
                            }}
                        />
                    </>
                ))}
                <Button onClick={() => setModalShow(true)}>+</Button>
                <EditorModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    model={props.selectedModel}
                />
            </nav>
        </div>
    );
}