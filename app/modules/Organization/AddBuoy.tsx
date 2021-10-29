import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Modal, Radio, Row, Select } from "antd";

const { Option } = Select;

const BuoyTypeOptions = [
  {
    title: "Smart Buoy",
    subtitle: "I want to add a data-enabled Nemo Pi smart buoy.",
    isSmart: true,
  },
  {
    title: "Normal Buoy",
    subtitle: "I want to add a static buoy that isn't smart.",
    isSmart: false,
  },
];

const AddBuoy = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={
        <>
          <PlusOutlined /> Add a Buoy
        </>
      }
      okText="Add Buoy"
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
      <>
        <Form form={form} layout="vertical" name="add-buoy-form">
          <Form.Item
            name="type"
            label="Which type of buoy are you adding?"
            rules={[
              {
                required: true,
                message: "Please select your buoy type",
              },
            ]}
          >
            <Radio.Group>
              <Row gutter={16}>
                {BuoyTypeOptions.map((x) => (
                  <Col md={12} key={x.title}>
                    <Radio name="isSmart" value={x.isSmart}>
                      <Card hoverable title={x.title} className="selected-card">
                        {x.subtitle}
                      </Card>
                    </Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="code"
            label="Connection Code"
            tooltip="The unique code reported by your smart buoy after it registered with our IoT Hub."
            hasFeedback
            validateStatus="success"
            normalize={(value) => (value || "").toUpperCase()}
            rules={[
              {
                required: true,
                message: "Enter your buoy's connection code",
              },
            ]}
          >
            <Input placeholder="e.g. E53D002A993FFSVSS022..." />
          </Form.Item>

          <Row gutter={16}>
            <Col md={16}>
              <Form.Item
                name="name"
                label="Buoy Name"
                rules={[
                  {
                    required: true,
                    message: "Enter a name by which you identify this buoy",
                  },
                ]}
              >
                <Input placeholder="e.g. Nemo Pi 001" />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                name="status"
                label="Current Status"
                tooltip="Is this buoy currently deployed at its target location or not? This can be added later."
                rules={[{ required: true, message: "Select a status" }]}
              >
                <Select placeholder="Click to Select">
                  <Option value="onLand">Not Deployed</Option>
                  <Option value="deployed">Deployed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.status !== currentValues.status
            }
            required
          >
            {({ getFieldValue }) => {
              return getFieldValue("status") === "deployed" ? (
                <Form.Item
                  label="Deployment Coordinates"
                  style={{ marginBottom: 0 }}
                  tooltip="The coordinates where this buoy is deployed so it can be shown accurately on the map."
                  required
                >
                  <Form.Item
                    name="lat"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 5px)",
                      marginRight: 8,
                    }}
                  >
                    <Input placeholder="Latitude" />
                  </Form.Item>
                  <Form.Item
                    name="lng"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 5px)",
                    }}
                  >
                    <Input placeholder="Longitude" />
                  </Form.Item>
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
};

export default AddBuoy;
