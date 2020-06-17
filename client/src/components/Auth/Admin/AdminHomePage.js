import React from "react";
import { Container } from "@material-ui/core";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function AdminHomePage() {
  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>
          Welcome <br />
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
