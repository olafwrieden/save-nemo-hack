import { PlusOutlined } from "@ant-design/icons";
import { InteractionRequiredAuthError } from "@azure/msal-common";
import { useAccount, useMsal } from "@azure/msal-react";
import { Button, Card, Col, Row, Skeleton } from "antd";
import { GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { parseRoleClaim } from "../utils";

const Developers = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [data, setData] = useState(null);

  const { handleCopy } = useCopyToClipboard();

  const formatResponse = (response) => {
    console.log(response);
    return {
      id: response.uniqueId,
      name: response.account.name,
      access_token: response.idToken,
      expires_on: response.expiresOn,
      tenantId: response.account.tenantId,
      username: response.account.username,
      scopes: response.scopes,
      roles: parseRoleClaim(response.idTokenClaims.extension_OrgRoles),
    };
  };

  useEffect(() => {
    if (account && inProgress === "none" && !data) {
      instance
        .acquireTokenSilent({
          scopes: [],
          account: account,
        })
        .then((response) => setData(formatResponse(response)))
        .catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
              instance
                .acquireTokenRedirect({
                  scopes: [],
                })
                .then((response) => setData(formatResponse(response)))
                .catch((error) => console.log(error));
            }
          }
        });
    }
  }, [account, inProgress, instance]);

  return (
    <>
      {/* <PageHeader
        title="Developer Portal"
        // breadcrumb={{ routes }}
        onBack={() => window.history.back()}
        subTitle={`Manage`}
      /> */}
      <p>Welcome to the Developer Portal</p>

      <Row gutter={16}>
        <Col sm={24} md={12}>
          <Card
            title="Access Token"
            extra={
              <Button
                onClick={() => handleCopy(data.access_token)}
                disabled={!data}
              >
                <PlusOutlined /> Copy Token
              </Button>
            }
          >
            <Skeleton loading={!data} active>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Developers.requireAuth = true

export default Developers;
