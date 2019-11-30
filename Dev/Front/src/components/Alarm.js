import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card, List } from 'antd'
import AlarmInfoList from './AlarmInfoList';
import { getUser, getLab } from '../authentication';
const { Title } = Typography;

class Alarm extends Component {

    state = {
    }
    
   constructor(props) {
        super(props);
        var information = [
            {
                id: 0,
                name: 'Hexane',
                date: '15',
                alarmType : 1
              },
              {
                id: 1,
                name: 'Benzene',
                date: '7',
                alarmType : 1
              },
              {
                id: 2,
                name: 'Benzeqwene',
                date: '10',
                alarmType : 1
              },
              {
                id: 3,
                name: 'Hexane',
                place : '냉장고',
                alarmType : 2
              },
              {
                 id: 4,
                 name: 'Benzene',
                 place : '오븐',
                 alarmType : 2
              },
              {
                 id: 5,
                 name: 'Benzeqwene',
                 place : '가방',  
                 alarmType : 2
              },
              {
                  id: 6,
                  name: 'Benzenecwqwsd',
                  use : '3개월',
                  disease : "간암",
                  alarmType : 3
               },
               {
                  id: 7,
                  name: 'Benzeqweneefefccv',
                  use : '6개월',  
                  disease : "췌장암",
                  alarmType : 3
               }
        ]

        fetch('http://13.124.122.246:8080/alarm/' + getUser().id, {
            method: 'GET', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
           
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                return response.json()
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        }).then(response => {
            //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
            //여기서 response라는걸 제대로 쓸 수 있음
            console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
            var list = [] //response.alarms
            var information = [] 
            for (var i in list){
                if (i.alarmType === 1) {
                    var a = {
                        alarmType: i.alarmType,
                        id: i.stock.id,
                        name: i.stock.chemical.name,
                        date: 
                    }
                    information.push(a)
                }
                else if(i.alarmType === 2){
                    var a = {
                        alarmType: i.alarmType,
                        id: i.stock.id,
                        name: i.stock.chemical.name,
                        place: i.inventory.name, 
                        volume: i.stock.volume
                    }
                    information.push(a)
                }
                else{
                    var a = {
                        alarmType: i.alarmType,
                        id: i.stock.id,
                        name: i.stock.chemical.name,
                        period: i.stock.chemical.illness.period,
                        disease: i.stock.chemical.illness.name
                    }
                    information.push(a)
                }
            }
            this.state = {
                information: information
            }
            //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
        })

        this.state = {
            type : 1,
            information: information,
            alarm1Count : information.filter( value => value.alarmType === 1).length,
            alarm2Count : information.filter( value => value.alarmType === 2).length,
            alarm3Count : information.filter( value => value.alarmType === 3).length
            
        }
    }

    handleRemove = (id, alarmType) => {
        const { information } = this.state;
        var type1Count = this.state.alarm1Count;
        var type2Count = this.state.alarm2Count;
        var type3Count = this.state.alarm3Count;
        if (alarmType===1){
            type1Count -= 1;
        }
        else if (alarmType===2){
            type2Count -= 1;
        }
        else if (alarmType===3){
            type3Count -= 1;
        }
        const new_information = information.filter(info => info.id !==id )
        this.setState({
            information : new_information,
            alarm1Count : type1Count,
            alarm2Count : type2Count,
            alarm3Count : type3Count
        })
    }


    
    makeTypeOne = () => {
        this.setState({type : 1})
    }

    makeTypeTwo = () => {
        this.setState({type : 2})
    }

    makeTypeThree = () => {
        this.setState({type : 3})
    }

    function = (value) =>{
        return value.alarmType 
    }
    
    getContent = () => {
        return (<div><AlarmInfoList data={this.state.information.filter( value => value.alarmType === this.state.type )} onRemove={this.handleRemove}/></div>)
    }


    render() {
       
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 50 }}>Alarm</Title></center>
                
                <Row style={{marginBottom : 30}}>
                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeOne} style={{ fontSize: '25px' }} size="large"/><br/>
                        유효기간 {this.state.alarm1Count}
                    </center></Col>

                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeTwo} style={{ fontSize: '25px' }} size="large"/><br/>
                        재고소진 {this.state.alarm2Count}
                    </center></Col>

                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeThree} style={{ fontSize: '25px' }} size="large"/><br/>
                        의심질병 {this.state.alarm3Count}
                    </center></Col>
                </Row>

                <Card style={{margin : 10}}>
                    {this.getContent()}
                </Card>
            </div>
        );
    }
}

export default Alarm;
