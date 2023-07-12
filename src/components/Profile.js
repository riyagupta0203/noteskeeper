import React, {useState, useEffect} from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import Moment from "react-moment";

const Profile = () => {
  const host = "http://localhost:8000/";
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    const response = await fetch(`${host}api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setLoading(false);
    console.log(json);
    setDetails(json);
  };

  useEffect(() => {
    getUser();
  }, [])
  return(
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
          <h2 className="fw-bold text-center">Profile</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <img
              src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"
              width="180px"
              height="180px"
              style={{ borderRadius: "50%" }}
              alt="check url"
            />  
        </div>
        <Card className="my-3">
            <Card.Header >Name:  
                <span className="fw-bold"> {details.name}</span> 
                <div className="my-1">Email:
                <span className="fw-bold"> {details.email}</span> 
                </div></Card.Header>
            <Card.Footer >
              <p>
                Created:{" "}
                <strong><Moment format="YYYY/MM/DD">{details.date}</Moment></strong>
                 |{" "}
                <Moment format="hh:mm:ss">{details.date}</Moment>
              </p>
            </Card.Footer>
        </Card>
      </Container>
      </>
  )
};

export default Profile;
