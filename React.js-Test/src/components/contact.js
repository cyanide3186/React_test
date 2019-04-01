import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './contactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';

export default class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedKey :-1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        {/*이벤트 처리를 위한 바인딩 */}
        this.handleChange = this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this. handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount(){
        /*컴포넌트 실행시 localStorage에 기존 contactData가 있으면 불러옴 */
        const contactData = localStorage.contactData;

        if(contactData){
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        /*컴포넌트 업데이트시 변경사항이 있으면 localStorage에 저장 */
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }
    /*이벤트 처리 메소드 */
    handleChange(e){
        this.setState({
           keyword: e.target.value

        });
    }

    handleClick(key){
        this.setState({
            selectedKey: key
        });
        console.log(key, 'is selected');
    }

    handleCreate(contact){
        this.setState({
            contactData:update(this.state.contactData,{$push:[contact]})
        });
    };

    handleRemove(){
        if(this.state.selectedKey <0){return;}
        /*선택하지 않았을때 삭제기능 무효화 */
        this.setState({
            contactData:update(this.state.contactData,{$splice: [[this.state.selectedKey,1]]}),
            selectedKey : -1
        });
    }

    handleEdit(name,phone){
        this.setState({
            contactData:update(this.state.contactData,
                {
                    [this.state.selectedKey]:{
                    name:{$set:name},
                    phone:{$set : phone}
                    }
                }
            )
        });
        console.log('HandleEdit(in Contact) Activate!!');
    }
    render() {
       
        const mapToComponents = (data) => {
            data.sort();
            data=data.filter(
                (contact)=>{
                    return contact.name.toLowerCase().indexOf(this.state.keyword)>-1;
                }
            )
            return data.map((contact, i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick={ () => { this.handleClick(i) } }
                        />);
            });
        };
        
        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value = {this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                     isSelected= {this.state.selectedKey != -1}
                     contact={this.state.contactData[this.state.selectedKey]}
                     onRemove = {this.handleRemove}
                     onEdit={this.handleEdit}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
