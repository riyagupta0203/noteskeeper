import React , { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import axios from 'axios'

const View = () => {
  const [loading, setLoading] = useState(false);
  const [noteDetails, setNoteDetails] = useState([]);
  const params = useParams();
  const host = "http://localhost:8000/"
  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const { data } = await axios.get(`${host}api/notes/view/${params.id}`);
      setLoading(false);
      setNoteDetails(data);
    };

    fetching();
  }, [params.id]);
  // console.log(noteDetails)
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}>
          <Spinner animation="border" />
        </div>
      )}
      <Container className="mt-5">
        <h2 className="my-5 fw-bold">View you entire created note here!</h2>
        <Card>
          <Card.Header className="fw-bold">{noteDetails.note?.tag}</Card.Header>
          <Card.Body>
            <h3>{noteDetails?.title}</h3>
            <ReactMarkdown>{noteDetails.note?.description}</ReactMarkdown>
            <Card.Footer>
              <p>
                Created:{" "}
                <strong><Moment format="YYYY/MM/DD">{noteDetails.note?.date}</Moment></strong>
                 |{" "}
                <Moment format="hh:mm:ss">{noteDetails.note?.date}</Moment>
              </p>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default View;
