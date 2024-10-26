import {createStackNavigator } from 'react-navigation-stack' ;
import { createAppContainer } from 'react-navigator';
import Index from 'app/index';
import Dummy from 'app/dummy';
const screens = {
    Home: {
        screen: Index,
    },
    Dummy: {
        screen: Dummy,
    }
}
const router = createStackNavigator(screens);
export default createAppContainer(router);