/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

// 屏蔽黄屏警告
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
