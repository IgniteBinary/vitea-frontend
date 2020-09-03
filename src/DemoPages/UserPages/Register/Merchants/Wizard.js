import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from 'react-loaders';

const getNavStates = (indx, length) => {
  let styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done');
    } else if (i === indx) {
      styles.push('doing');
    } else {
      styles.push('todo');
    }
  }
  return { current: indx, styles: styles };
};

const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
      showLoginButton: false,
    };
  } else if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
      showLoginButton: true,
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
      showLoginButton: false,
    };
  }
};

export class MultiStep extends React.Component {
         state = {
           success: false,
           showPreviousBtn: false,
           showNextBtn: true,
           showLoginButton: true,
           compState: 0,
           navState: getNavStates(0, this.props.steps.length),
         };

         componentDidUpdate = (prevProps, prevState) => {
           if (this.props.success !== prevProps.success) {
               this.setNavState(this.state.compState + 1);
               console.log('Yess')
           }
           if (this.props.superAdminSuccess !== prevProps.superAdminSuccess){
               this.setNavState(this.state.compState + 1);
           }
         };

         setNavState = (next) => {
             console.log(this.props.success);
           this.setState({
             navState: getNavStates(next, this.props.steps.length),
           });
           if (next < this.props.steps.length ) {
               
             this.setState({ compState: next });
           }

           this.setState(checkNavState(next, this.props.steps.length));
         };

         handleKeyDown = (evt) => {
           if (evt.which === 13) {
             this.next();
           }
         };

         backToLogin = () => (window.location.href = '/');

         handleOnClick = (evt) => {
           if (
             evt.currentTarget.value === this.props.steps.length - 1 &&
             this.state.compState === this.props.steps.length - 1
           ) {
             this.setNavState(this.props.steps.length);
           } else {
             this.setNavState(evt.currentTarget.value);
           }
         };
          

         
         next = async () => {
           if (this.state.compState === 0) {
             this.props.handleSubmit()
           }
           if (this.state.compState === 1) {
             this.props.handleCreateSuperAdmin();
             if (
               this.props.Facility.success &&
               Object.keys(!this.props.errors).length > 0
             ) {
               this.setNavState(this.state.compState + 1);
             }
             
           }
            // this.setNavState(this.state.compState + 1);
         };
         previous = () => {
           if (this.state.compState > 0) {
             this.setNavState(this.state.compState - 1);
           }
         };

         getClassName = (className, i) => {
           return className + '-' + this.state.navState.styles[i];
         };

         renderSteps = () => {
           return this.props.steps.map((s, i) => (
             <li
               className={this.getClassName('form-wizard-step', i)}
              // onClick={this.handleOnClick}
               key={i}
               value={i}
             >
               <em>{i + 1}</em>
               <span>{this.props.steps[i].name}</span>
             </li>
           ));
         };

         render() {
           return (
             <div onKeyDown={this.handleKeyDown}>
               <ol className='forms-wizard'>{this.renderSteps()}</ol>
               {this.props.steps[this.state.compState].component}
               <div className='divider' />
               <div className='clearfix'>
                 <div
                   style={this.props.showNavigation ? {} : { display: 'none' }}
                 >
                   <Button
                     color='secondary'
                     className='btn-shadow float-left btn-wide btn-pill'
                     outline
                     style={
                       this.state.showPreviousBtn && this.state.compState !== 2 ? {} : { display: 'none' }
                     }
                     onClick={this.previous}
                   >
                     Previous
                   </Button>

                   <Button
                     color='secondary'
                     className='btn-shadow float-left btn-wide btn-pill'
                     outline
                     style={
                       this.state.showLoginButton ? {} : { display: 'none' }
                     }
                     onClick={this.backToLogin}
                   >
                     Back to login
                   </Button>

                   <Button
                     color='primary'
                     className='btn-shadow btn-wide float-right btn-pill btn-hover-shine'
                     style={this.state.showNextBtn && this.state.compState !== 2 ? {} : { display: 'none' }}
                     onClick={this.next}
                   >
                     {this.props.Facility.isLoading ? (
                       <Loader
                         className='align-self-center'
                         type='ball-pulse-sync'
                         color='#00a1ff'
                       />
                     ) : (
                       'Next'
                     )}
                   </Button>
                 </div>
               </div>
             </div>
           );
         }
       }

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(MultiStep);

MultiStep.defaultProps = {
  showNavigation: true,
};
