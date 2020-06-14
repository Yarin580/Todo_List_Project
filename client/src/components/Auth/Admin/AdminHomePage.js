import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { UserContext } from "../../../context/UserContext";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function AdminHomePage() {
  const { userLogin } = useContext(UserContext);

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>
          Welcome <br />
          {userLogin.firstName} {userLogin.lastName}
        </h1>
        <br />
        <hr />
        <Link to="/AdminUserList" style={{ textDecoration: "none" }}>
          <Button outline color="primary" size="lg" block>
            Users List
          </Button>
        </Link>
        <br />
        <Link to="/AdminStatistic" style={{ textDecoration: "none" }}>
          <Button outline color="primary" size="lg" block>
            Statistic
          </Button>
        </Link>
        <br />
        <Link to="/AdminDeleteUser" style={{ textDecoration: "none" }}>
          <Button outline color="primary" size="lg" block>
            Delete User
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default AdminHomePage;
