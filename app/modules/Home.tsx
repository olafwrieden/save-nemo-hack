import { Card, Col, Empty, Row, Tag, Table } from "antd";
import { useUser } from "../hooks/useUser";
import { OrgRole } from "../utils";

export const Home = () => {
  const { full_name, roles } = useUser() ?? {};

  return (
    <>
      <p>Welcome, {full_name}</p>

      <Row>
        <Col md={12}>
          <Card title="My Organizations &amp; Roles">
            {formatOrgRoles(roles)}
          </Card>
        </Col>
      </Row>
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
