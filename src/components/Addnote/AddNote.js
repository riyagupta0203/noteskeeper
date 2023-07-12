import React,{useContext, useState} from 'react'
import noteContext from "../../context/notes/noteContext"
import { Button, Form } from "react-bootstrap";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "Default"})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Added successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
        
    return (
        <div>
            <h1 className="fw-bold">Add a Note</h1>
            <Form className="mt-2" onSubmit={handleClick}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label className="fw-bold">Title</Form.Label> 
                    <Form.Control type="text"  value={note.title} name="title" placeholder="Title" onChange={onChange} minLength={5} required />   
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={note.description}
                        placeholder="Description..."
                        onChange={onChange}
                        name="description"
                        minLength={5} required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tag">
                    <Form.Label className="fw-bold">Tags</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="work, personal, health...."
                        value={note.tag}
                        name="tag"
                        onChange={onChange}
                    />
                </Form.Group>
                <Button  type="submit" onClick={handleClick} className="fw-bold">
                    Add Note
                </Button>
            </Form>
            
        </div>
    )
}

export default AddNote
