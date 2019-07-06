import Settings from '../constants/Settings'
import CommonUtil from './CommonUtil';
import { encode as btoa} from 'base-64'

export default class Api {
  static token = null;

    static GET_HEADER = () =>{
      return {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:Api.token? "Bearer "+Api.token:null
        },
      }
    }
    
    static POST_HEADER= (body) => {
      return {
      method: "POST",
      headers: {
         Accept: "application/json", 
         "Content-Type": "application/json",
         Authorization:Api.token?"Bearer "+Api.token:null,
      },
      body: JSON.stringify(body)
    }
  }

  static POST_HEADER_LOGIN = (body, header) => {
    return {
    method: "POST",
    headers: header,
    body: body
   }
  }

  static handleLogin = (component, redirectSettings=true, callback, spinner=true, message=true)=>{
    if(spinner===true) component.props.setLoading(true);
    const u = {...component.state.target};

    const client_id = 'tripesco';
    const client_secret = 'bBVmmiPKSeseM';

    let requestBody = new FormData();
    requestBody.append('grant_type', 'password');
    requestBody.append('username', u.email);
    requestBody.append('password', u.password);
    requestBody.append('client_id', client_id);
    requestBody.append('client_secret', client_secret);
    requestBody.append('scope', 'read');

    const requestHeader = {
      'Accept': 'application/json',
      'Content-type': 'multipart/form-data',// 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+btoa(client_id+":"+client_secret)
    }

    fetch(`${Settings.ip}/oauth/token?`, 
    Api.POST_HEADER_LOGIN(requestBody, requestHeader))
    .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.access_token && responseJson.access_token.length>0){
            Api.token = responseJson.access_token;
            if(spinner===true) component.props.setLoading(false);
            Api.getLoggedInUser(component, redirectSettings, callback);
            
          } else {
            if(message===true) component.props.setLoading(false, 'invalid email or password');
          }
        })
        .catch((error) => {
          if(spinner===true) component.props.setLoading(false);
        });
}

 
  static getLoggedInUser = (component, redirectSettings=true, callback)=>{
    console.log('getLoggedInUser')
    const u = {...component.state.target};
    fetch(`${Settings.ip}/users/loggedinuser`, Api.GET_HEADER())
        .then((response) => response.json())
            .then((responseJson) => {
              console.log('getLoggedInUser 2='+responseJson.result.id)
              if(responseJson && responseJson.result && responseJson.result.id>0){
                responseJson.result.token = Api.token;
                console.log('getLoggedInUser 3='+redirectSettings);
                responseJson.result.password = u.password;
                component.props.setLoggedInUser(responseJson.result);
                if(redirectSettings){
                console.log('getLoggedInUser 4')
                  component.props.navigation.navigate('Settings');
                }
                if(callback){
                  callback();
                } 
              }else{
                component.props.setLoading(false, 'invalid email or password');
              }
            })
            .catch((error) => {
            });
  }

  static handleDriverRegister = (component) => {
    const { props } = component;
    const driver =  component.state.target;
    console.log('component.state.validate()=');
    console.log(component.state.validate());
    if(!component.state.validate()){
      return;
    }
    driver.busyDays = null;
    Api.refreshCarUtilities(component);
    console.log('Api.POST_HEADER(driver) begin');
    console.log(Api.POST_HEADER(driver));
    console.log('Api.POST_HEADER(driver) end');
    props.setLoading(true, null, null);

    fetch(`${Settings.ip}/drivers/edit`, Api.POST_HEADER(driver))
      .then(response => response.json())
      .then(responseJson => { 
        console.log(responseJson);
        props.setLoading(false, responseJson.errorMessage, responseJson.successMessage);
      })
      .catch(error => {
        props.setLoading(false, error);
      });
  };

  static handleCarRegister = (component) => {
    const { props } = component;
    Api.refreshCarUtilities(component);
    const state = {...component.state};
    const {driver} = state;
    props.setLoading(true, null, null);
    fetch(`${Settings.ip}/cars`, Api.POST_HEADER(driver.carList[0]))
      .then(response => response.json())
      .then(responseJson => { 
        // console.log(responseJson)
        props.setLoading(false, responseJson.errorMessage, responseJson.successMessage);
      })
      .catch(error => {
        props.setLoading(false, error);
      });
  };

  static handleGuideRegister = (component) => {
    if(!component.state.validate()) return;
    const { props } = component;
    const state = {...component.state};
    const guide = state.target;
    guide.busyDays = null;
    props.setLoading(true);
    console.log("Api.POST_HEADER(guide) begin");
    console.log(Api.POST_HEADER(guide));
    console.log("Api.POST_HEADER(guide) end");
    
    fetch(`${Settings.ip}/guides`, Api.POST_HEADER(guide))
      .then(response => response.json())
      .then(responseJson => { 
        props.setLoading(false, Api.getErrorMessage(responseJson), 'Successfully registered. We are reviewing your request.');
      })
      .catch(error => {
        props.setLoading(false, error);
      });
  };


  static handleSaveUser = (component) => {
    const { props } = component;
    const state = {...component.state};
    if(!state.validate()) return;
    const {target} = state;
    console.log(Api.POST_HEADER(target))
    props.setLoading(true);
    fetch(`${Settings.ip}/users`, Api.POST_HEADER(target))
      .then(response => response.json())
      .then(responseJson => { 
        //props.setLoading(false, Api.getErrorMessage(responseJson));
       // props.setLoggedInUser(target);
        Api.handleLogin(component,false, ()=>props.setLoading(false),false,false);
        props.navigation.goBack();
      })
      .catch(error => {
        props.setLoading(false, error);
      });
  };


  static handleDriverWorkSchedule = (component) => {
    const { props } = component;
    const state = {...component.state};
    let driver = {...state.driver};
    driver.userId = null;
    let res ="";
    
    driver.busyDays.forEach((bd)=>{
      res+= CommonUtil.formatDateByDash(new Date(bd))+";"
    });
    driver.busyDays = res;
    props.setLoading(true, null, null);
    fetch(`${Settings.ip}/drivers/work/edit`, Api.POST_HEADER(driver))
      .then(response => response.json())
      .then(responseJson => { 
        props.setLoading(false, responseJson.errorMessage, responseJson.successMessage);
      })
      .catch(error => {
        props.setLoading(false, error);
      });
  };



  static handleGuideWorkSchedule = (component) => {
    const { props } = component;
    const state = {...component.state};
    let guide = {...state.guide};
    guide.userId = null;
    let res ="";
    
    guide.busyDays.forEach((bd)=>{
      res+= CommonUtil.formatDateByDash(new Date(bd))+";"
    });
    guide.busyDays = res;
    props.setLoading(true, null, null);
    fetch(`${Settings.ip}/guides/work/edit`, Api.POST_HEADER(guide))
      .then(response => response.json())
      .then(responseJson => { 
        props.setLoading(false, responseJson.errorMessage, responseJson.successMessage);
      })
      .catch(error => {
        props.setLoading(false, error);
      });
  };
  
  static getErrorMessage = (json)=>{
    if(json && json.cause && json.cause.cause){
      return json.cause.cause.message;
    }
  }



  static loadDriver = (component)=> {
        fetch(`${Settings.ip}/drivers/loggedin`, Api.GET_HEADER())
        .then((response) => response.json())
            .then((responseJson) => {
              const driver = responseJson.result;
              if(driver){
                if(!driver.carList) driver.carList =[]
                if(!driver.carList[0]) driver.carList = [{modelId:{brandId:{}}}]
                const busyDays = [];
                if(driver.busyDays){
                    const tempBusyDays = driver.busyDays.split(";");
                    tempBusyDays.forEach((bd)=>{
                      if(bd.trim().length===0) return;
                      const datestr = new Date(bd).toString().replace(" (+04)","").replace("04:00:00","00:00:00");
                      busyDays.push(datestr);
                    })
                }
                driver.busyDays = busyDays;
                

                Api.checkUtilities(component, driver);

                Api.loadBrands(component);
                

                component.setState({target: driver});
              }
            })
            .catch((error) => {
            });
       }
  

  static loadGuide = (component)=> {
        const props = component.props;
        // const u = props.loggedInUser;
        // if(u===null) return;
        props.setLoading(true);
        
        fetch(`${Settings.ip}/guides/loggedin`, Api.GET_HEADER())
        .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              const guide = responseJson.result;
              if(guide){
                const busyDays = [];
                if(guide.busyDays){
                    const tempBusyDays = guide.busyDays.split(";");
                    tempBusyDays.forEach((bd)=>{
                      if(bd.trim().length===0) return;
                      const datestr = new Date(bd).toString().replace(" (+04)","").replace("04:00:00","00:00:00");
                      busyDays.push(datestr);
                    })
                }
                guide.busyDays = busyDays;
                component.setState({target: guide});
                //Api.checkUtilities(component);
              }
              props.setLoading(false);
            })
            .catch((error) => {
                props.setLoading(false);
            });
       }

  static loadCarUtilities = (component)=>{
    fetch(`${Settings.ip}/carUtilities`, Api.GET_HEADER())
        .then((response) => response.json())
        .then((responseJson) => {
          const list = responseJson._embedded.carUtilities;
          if(list){
            component.setState({carUtilities: list});
          }
          Api.loadDriver(component);
        })
        .catch((error) => {
        });
  }

  static loadDrivers = (component)=>{
    const props = component.props;
    const {selectedDate} = props;
    props.setLoading(true);
    fetch(Settings.ip+'/drivers?date='+CommonUtil.formatDateByDash(selectedDate), Api.GET_HEADER())
    .then((response) => response.json())
    .then((responseJson) => {
          props.setDrivers(responseJson.result);
          props.setLoading(false);
    }).catch((error) => {
      props.setLoading(false);
    });
  }

  static loadDestinations = (component, spinner = true)=>{
    const props = component.props;
    if(spinner===true) props.setLoading(true);
    fetch(Settings.ip+'/places', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          props.setDestinations(responseJson._embedded.places);
          if(spinner===true) props.setLoading(false);
        })
        .catch((error) => {
          if(spinner===true) props.setLoading(false);
        });
  }

  static loadLanguages = (component, spinner = true)=>{
    const props = component.props;
    if(spinner===true) props.setLoading(true);
    fetch(Settings.ip+'/languages', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          props.setLanguages(responseJson._embedded.languages);
          if(spinner===true) props.setLoading(false);
        })
        .catch((error) => {
          if(spinner===true) props.setLoading(false);
        });
  }


  static loadBrands = (component)=>{
    const props = component.props;
    fetch(Settings.ip+'/brands', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          props.setBrands(responseJson.result);
          const driver = component.state.target;
          if(driver && driver.carList[0] && driver.carList[0].modelId && driver.carList[0].modelId.brandId){
              Api.loadModels(component, driver.carList[0].modelId.brandId.id);
          }else{
            props.setModels([]);
          }
          
        })
        .catch((error) => {
        });
  }


  static loadModels = (component, brandId)=>{
    const props = component.props;
    fetch(Settings.ip+'/models?brandId='+brandId, {
      method: 'GET',
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          props.setModels(responseJson.result);
        })
        .catch((error) => {
        });
  }

  static loadNationalities = (component, spinner = true, callback)=>{
    const props = component.props;
    if(spinner===true) props.setLoading(true);
    fetch(Settings.ip+'/nationalities', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => { 
          props.setNationalities(responseJson._embedded.nationalities);
          if(spinner===true) props.setLoading(false);
        })
        .catch((error) => {
          if(spinner===true) props.setLoading(false);
        });
  }

  static loadTimeSlots = (component)=>{
    const props = component.props;
    fetch(Settings.ip+'/timeslots', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
        .then((responseJson) => {
          props.setTimeSlots(responseJson._embedded.timeSlots);
        })
        .catch((error) => {
        });
  }
  static loadGuides = (component)=>{
    const { props } = component;
    const{ selectedDate, selectedDestination, selectedLanguage, selectedGender } = props;
   
    const url= Settings.ip+'/guides?'+
    'date='+CommonUtil.formatDateByDash(selectedDate)+
    '&placeId='+CommonUtil.cleanData(selectedDestination)+
    '&languageId='+CommonUtil.cleanData(selectedLanguage)+
    '&genderId='+CommonUtil.cleanData(selectedGender);

    console.log(url);
    props.setLoading(true);
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
          .then((responseJson) => {
            props.setGuides(responseJson.result);
            props.setLoading(false);
          })
          .catch((error) => {
            props.setLoading(false);
          });
  }

  static checkUtilities = (component, driver)=>{
    if(!driver) return;
    const carUtilities = component.state.carUtilities;
    if(!carUtilities || carUtilities.length===0) return;

    let carUtilitiesObj = {};

    for(var i=0;i<carUtilities.length;i++){
      let carUtility = carUtilities[i];
      carUtilitiesObj[carUtility.id] = carUtility;
    }
    if(driver && driver.carList
      && driver.carList.length>0 
      && driver.carList[0].carCarUtilityList){
        let carCarUtilities = driver.carList[0].carCarUtilityList;
        for(var i=0;i<carCarUtilities.length;i++){
           const carCarUtility = carCarUtilities[i];
           carUtilitiesObj[carCarUtility.carUtilityId.id].checked=true;
        }
    }
    component.setState(carUtilities)
  }


  static refreshCarUtilities = (component)=>{
    const {target, carUtilities} = component.state;
    const driver = target;
    if(!driver) return;
    if(!carUtilities || carUtilities.length===0) return;
   
    const car = driver.carList[0];
    const carCarUtilityList = car.carCarUtilityList = [];
    for(var i=0;i<carUtilities.length;i++){
           const carUtility = carUtilities[i];
           if(carUtility.checked===true){
              carCarUtilityList.push({
                  carId:{id:car.id},
                  carUtilityId:{id:carUtility.id}
              })
           }
    }
    component.setState({})
  }
  
  static addTrip = (component, trip) => {
    const { props } = component;
    trip.userId.id = null;
    props.setLoading(true);
    const {loggedInUser} = props;
    component.state.target = trip.userId;
    const url = `${Settings.ip}/trips/add`;
    
    fetch(url, Api.POST_HEADER(trip))
      .then(response => response.json())
      .then(responseJson => { 
        if(!loggedInUser){
          console.log('login');
          component.props.resetTrip();
          Api.handleLogin(component, false, ()=>{component.handleSuccess()}, false);
          props.setLoading(false, responseJson.errorMessage, responseJson.successMessage);
        }else{
          component.handleSuccess();
          props.setLoading(false, responseJson.errorMessage, responseJson.successMessage);
        }
      })
      .catch(error => {
        console.log('error trip');
        console.log(error);
        props.setLoading(false, error);
      });
  };

  static loadTrips = (component, type=2)=>{
    const props = component.props;
    props.setLoading(true);
    const url = Settings.ip+'/trips?type='+type;
    fetch(url, Api.GET_HEADER())
    .then((response) => response.json())
    .then((responseJson) => {
          props.setTrips(responseJson.result);
          props.setLoading(false);
    }).catch((error) => {
      props.setLoading(false);
    });
  }

  static register = (component)=>{
    component.props.setLoading(true);
     
    fetch(`${Settings.ip}/users`, Api.POST_HEADER(component.state.target))
    .then((response) => response.json())
        .then((responseJson) => {
          Api.handleLogin(component);
        })
        .catch((error) => {
          console.log(error);
          component.props.setLoading(false);
        });
  }

}

