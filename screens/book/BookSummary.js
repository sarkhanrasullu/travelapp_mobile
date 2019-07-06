import React, { Component } from "react";
import { Animated } from "react-native";
import { Container, Content, Footer } from "native-base";
import { connect } from 'react-redux';
import { setTrip } from '../../modules/entities';
import LoadingSpinner from '../../components/LoadingSpinner'
import BookDetails from './BookDetails'
import BookTotal from "./BookTotal";

class BookSummary extends Component {
  state = {
    target: {userId:{}},
    validation:{},
    validate:null
  };

  footer = ()=>{
    return (
      null
    )
  } 

  render() {
      return (
      <Container>
        <Content>
           {
             this.props.isLoading?
              <LoadingSpinner text={"Please wait..."}/>:
              <BookDetails component={this} />
            }
        </Content>
        <Footer style={{height:120}}>
            <BookTotal component={this} />
        </Footer>
      </Container>
    );
  }
}

const moduleState = state => ({
  isLoading: state.loading.loading,
});

const moduleActions = {
  setTrip
}

export default connect(moduleState,moduleActions)(BookSummary);
