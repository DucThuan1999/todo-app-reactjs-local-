import React from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

class ModalCustom extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.props.handleEdit();
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button
          type="primary"
          onClick={(() => this.handleEdit(), this.showModal)}
        >
          <EditOutlined />
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <form>{this.props.children}</form>
        </Modal>
      </>
    );
  }
}

export default ModalCustom;
