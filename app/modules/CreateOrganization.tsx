import { ShopOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select } from "antd";

const { Option } = Select;

const CreateOrganization = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={
        <>
          <ShopOutlined /> Create an Organization
        </>
      }
      okText="Create"
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
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input a name for your organization",
            },
          ]}
        >
          <Input placeholder="e.g. Tim's Diving School" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select the type of organization" allowClear>
            <Option value="divingschool">Diving School</Option>
            <Option value="hotelmotel">Hotel / Motel</Option>
            <Option value="diy">DIY Purposes</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateOrganization;
