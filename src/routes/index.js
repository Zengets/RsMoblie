import { Home, Login } from '../pages/index';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppNavigator = createStackNavigator(
    {
        Home: Home,
        Login: Login
    },
    {
        initialRouteName: 'Home',
    }
);
const App = createAppContainer(AppNavigator);

export default App

