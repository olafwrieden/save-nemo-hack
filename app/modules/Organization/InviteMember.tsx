import { UserAddOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Row, Select, Typography } from "antd";

const { TextArea } = Input;
const { Paragraph } = Typography;
const { Option, OptGroup } = Select;

const InviteMember = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={
        <>
          <UserAddOutlined /> Invite a Member
        </>
      }
      okText="Invite"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="invite-member"
        initialValues={{ role: "reader" }}
      >
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Enter a valid email address",
                },
              ]}
            >
              <Input placeholder="e.g. sam.smith@example.com" type="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select placeholder="Select the role">
                <OptGroup label="Read-only">
                  <Option value="reader">Reader</Option>
                </OptGroup>
                <OptGroup label="Manage Organization">
                  <Option value="contributor">Contributor</Option>
                </OptGroup>
                <OptGroup label="Owner &amp; Billing">
                  <Option value="owner">Admin</Option>
                </OptGroup>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="message"
          label="Optional Message"
          rules={[
            { max: 200, message: "Enter a message of up to 200 characters" },
          ]}
        >
          <TextArea
            placeholder="This message appears on the invitation"
            allowClear
          />
        </Form.Item>

        <Paragraph>Invitations expire after 5 days.</Paragraph>
      </Form>
    </Modal>
  );
};

export default InviteMember;
