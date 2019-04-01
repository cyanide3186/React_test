import React from 'react';
import propTypes from 'prop-types';

export default class ContactCreate extends React.Component{
    constructor(props){
        /*생성자에 요소 추가시 꼭 웹페이지를 리로딩할것 */
        super(props);
        this.state ={
            name : '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleChange(e){
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }
    handleClick(){
        const contact = {
            name : this.state.name,
            phone : this.state.phone
        };
        this.props.onCreate(contact);
        this.setState({
            name:'',
            phone: ''
        });
        this.nameInput.focus();
    }
    handleKeyPress(e){
        if(e.charCode===13){
            this.handleClick();
        }
    }
    render(){
        return (
            <div>
                <h2>Create Contact</h2>
                <div>
                        <p>
                            <input type ="text" name="name" 
                                placeholder="name" value={this.state.name}
                                onChange={this.handleChange}
                                ref={(ref) => {this.nameInput=ref}}
                            />
                        </p>
                        <p>
                            <input type="text" name="phone"
                                placeholder="phone" value={this.state.phone}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                            />
                    </p>
                </div>
                <button onClick={this.handleClick}>Create</button>
            </div>
        );
    }
}

ContactCreate.propTypes={
    onCreate : propTypes.func
};
ContactCreate.defaultProps={
    onCreate: ()=>{console.error('onCreate ont defined');}
}