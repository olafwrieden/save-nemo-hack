import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, message, Row, Table, Tag } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { OrgRole } from "../utils";
import CreateOrganization from "./CreateOrganization";

export const Home = () => {
  const { full_name, roles } = useUser() ?? {};
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    message.error("This feature is unavailable");
    setIsCreateOrgOpen(false);
  };

  return (
    <>
      <p>Welcome, {full_name}</p>

      <Row gutter={10}>
        <Col md={12}>
          <Card
            title="My Organizations &amp; Roles"
            extra={
              <Button onClick={() => setIsCreateOrgOpen(true)}>
                <PlusOutlined /> New
              </Button>
            }
          >
            {formatOrgRoles(roles)}
          </Card>
        </Col>
      </Row>
      <CreateOrganization
        visible={isCreateOrgOpen}
        onCreate={onCreate}
        onCancel={() => {
          setIsCreateOrgOpen(false);
        }}
      />
    </>
  );
};

const formatOrgRoles = (roles: OrgRole[] = []) => {
  // Add unique key to dataset (for rendering)
  roles = roles.map((r) => ({ ...r, key: `${r.orgId}:${r.role}` }));

  const columns = [
    {
      title: "Organization ID",
      dataIndex: "orgId",
      key: "orgId",
      render: (orgId) => (
        <Link
          replace={true}
          href={`/organizations/${encodeURIComponent(orgId)}`}
        >
          <a>{orgId}</a>
        </Link>
      ),
    },
    {
      title: "My Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color="green" key={role}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      dataSource={roles}
      columns={columns}
      tableLayout="fixed"
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="You are not a member of any organization."
          />
        ),
      }}
    />
  );
};
