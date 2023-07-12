import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
import Moment from "react-moment"; 

const Noteitems = (props) => {
  // const [show, setShow] = useState(false);
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  // const handleShow = () => setShow(true);
  return (
    <div className="col-md-3">
      <div className="card my-2 my-2">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title fw-bold">{note.title}</h5>
          </div>
          <p className="card-text">{note.description.substr(0, 12)}...</p>
          <Link to={`/view/${note?._id}`}>
              <button className="btn btn-primary mt-2 fw-bold text-white">
                View
              </button>
          </Link>
          <button className="btn btn-secondary fw-bold text-white ms-2 mt-2" onClick={()=>{updateNote(note); }}>
            Edit
          </button>
          <button className="btn btn-danger fw-bold ms-2 mt-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}>
            Delete
          </button>
          <div style={{ margin: "10px 0" }}>
              <small>
                Created:{" "}
                <strong>
                  <Moment format="YYYY/MM/DD">{note?.date}</Moment>
                </strong>{" "}
                |{" "}
                <em>
                  <Moment format="hh:mm:ss">{note?.date}</Moment>
                </em>
              </small>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
