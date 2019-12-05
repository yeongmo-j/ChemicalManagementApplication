import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { history } from '../History';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'

const { Title } = Typography;

class MyGroupGenerate extends Component {

  constructor(props){
    super(props);
  }

  //그룹 생성 버튼 클릭했을 때
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(222222);
      if (!err) {
        //그룹 생성 정보
        console.log(values)
        const registInformation = {
          name: values.groupName,
          password: values.groupPassword,
        }
        console.log(registInformation)
        //http요청
        fetch(serverUrl + '/lab/' + getUser().id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registInformation)
        }).then(response => {
          if (response.status === 200) {
            //그룹 생성이 성공적으로 수행 되었을 경우
            message.success('그룹이 생성되었습니다!');
            return response.json()
          }
          else {
            message.warning('같은 그룹 이름을 사용하는 그룹이 이미 존재합니다!');
          }
        }).then(response => {
          console.log(response)
          localStorage.setItem('lab', JSON.stringify(response.lab));
          this.props.afterGroupGenerate(getLab().id);

        })
      } else {
        //비밀번호 틀렸을 경우
        message.warning('두 비밀번호가 같은지 확인해 주세요!');
      }
    });
  };

  //비밀번호 두개 일치하는지 확인
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('groupPassword')) {
      callback('두 비밀번호가 일치하지 않습니다!');
    } else {
      callback();
    }
  };

  //비밀번호 검증 과정인데 따로 규칙 지정 안했으므로 항상 true
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    form.validateFields(['confirm'], { force: true });
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '10px 0' }}>
      <center><Title style={{marginBottom : 50}}>my Lab 생성</Title></center>

      <Form onSubmit={this.handleSubmit} className="form">

      {/* 그룹 이름 */}
      <Form.Item>
      {getFieldDecorator('groupName', {
        rules: [{ required: true, message: '그룹 이름을 입력해 주세요!' }],
      })(
        <Input
        //prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Group Name"
        />,
      )}
      </Form.Item>

      {/* 그룹 비밀번호1 */}
      <Form.Item hasFeedback>
      {getFieldDecorator('groupPassword', {
        rules: [
          {
            required: true,
            message: '비밀번호를 입력해 주세요!',
          },
          {
            validator: this.validateToNextPassword,
          },
        ],
      })(<Input.Password
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Group Password" />)}
        </Form.Item>

        {/* 비밀번호2 */}
        <Form.Item hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: '비밀번호를 다시 한번 입력해 주세요!',
            },
            {
              validator: this.compareToFirstPassword,
            },
          ],
        })(<Input.Password
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Confirm Group Password"
          onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          {/* 그룹 생성 버튼 */}
          <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
          그룹 생성하기
          </Button>
          </Form.Item>

          </Form>

          </div>
        );
      }
    }

    export default Form.create()(MyGroupGenerate);
