import { Html, Head, Body, Container, Button, Text } from "@react-email/components";

const ApproveRejectEmail = ({ approveUrl, rejectUrl }) => (
  <Html>
    <Head />
    <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}>
      <Container style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px" }}>
        <Text style={{ fontSize: "18px", marginBottom: "20px" }}>
          A new user has signed up on Crowdshaki. Please approve or reject their request:
        </Text>
        <Button href={approveUrl} style={{ backgroundColor: "#28a745", color: "#ffffff", marginRight: "10px" }}>
          Approve
        </Button>
        <Button href={rejectUrl} style={{ backgroundColor: "#dc3545", color: "#ffffff" }}>
          Reject
        </Button>
      </Container>
    </Body>
  </Html>
);

export default ApproveRejectEmail;
