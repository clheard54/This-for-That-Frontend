import React, { useState, useContext } from 'react'
import userContext from '../../context/userContext';
import { api } from '../api'

const userProvider = ({children}) => {
    const [color, setColor] = useState("Red");
    const value = { color, setColor };
    return (
      <userContext.userProvider>
        {children}
      </userContext.userProvider>
    )
  }
  export default () => {
    const {color, setColor} = useContext(userContext);
    return (
      <userProvider>
        <button color={color} onClick={()=>setColor("Green")}>
          Colored Button!
        </button>
      </userProvider>
    )
  }

// const userProvider = (props) => {
    //store App-wide state here instead of in App component
    // const [state, setState] = useState({})
    //       current_user: '',
    //       errors: false
    //     })   
        
    //define "value", which is what will be passed down and accessible to things wrapped in MyContext.Consumer

    // return (
    //     <userContext.Provider value={[state, setState]}
            //destructure state: this.state.cars,

            //add any functions to be passed down
            // userLogin: (user) => {
            //     this.setState({
            //         current_user: user
            //     })
            // },
            // userLogout: () => {
            //     localStorage.removeItem('userToken')
            //     this.setState({
            //         current_user: null
            //     })
            // }
//     >
//         {props.children}
//     </userContext.Provider>
//     );
// }
//     }
//     //store App-wide state here instead of in App component
//     constructor(){
//         super();
//         this.state = {
//           current_user: '',
//           errors: false
//         }
//       }
    
//       componentDidMount() {
//         const userToken = localStorage.getItem("userToken");
//         if (userToken) {
//           // make a request to the backend and find our user
//           api.auth.getCurrentUser().then(user => {
//             this.setState({
//                 current_user: user
//             })
//           });
//         }
//         }
    
        
//     //define "value", which is what will be passed down and accessible to things wrapped in MyContext.Consumer
//     render() {
//         return (
//             <MyContext.Provider
//                 value={{
//                     //destructure state: this.state.cars,
//                     current_user: this.state.current_user,

//                     //add any functions to be passed down
//                     userLogin: (user) => {
//                         this.setState({
//                             current_user: user
//                         })
//                     },
//                     userLogout: () => {
//                         localStorage.removeItem('userToken')
//                         this.setState({
//                             current_user: null
//                         })
//                     }

//                 }}
//             >
//                 {this.props.children}
//             </MyContext.Provider>
//         );
//     }
// }

/*
consumer MUST return callback function which takes context
const COMPONENT_NAME = () => (
    <MyContext.Consumer>
        {context => (
            <Fragment>
                {Object.keys(context.cars) => destructing would give you access to:
                        key={carID}
                        name={context.cars[carID].name}
                        price={context.cars[carID].price}
                        incrementPrice={() => context.incrementPrice(carID)}
                        decrementPrice={() => context.decrementPrice(carID)}
                    />
                ))}
            </Fragment>
        )}
    </MyContext.Consumer>
)
*/
// export default userProvider;