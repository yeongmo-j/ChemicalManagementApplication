import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';

import { history } from '../History';
import { serverUrl } from '../setting';

const { Title } = Typography;
const { Text } = Typography;

class MyGroupWithdraw extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '10px' }}>
      <br /><font size='4' font color='green'>현재 속한 Lab이 없습니다!</font>
      </div>
    );
  }
}

export default Form.create()(MyGroupWithdraw);