import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {IconOutline} from '@ant-design/icons-react-native';
import {Button} from '@ant-design/react-native';
import IconWithBadge from './IconWithBadge';
import HeaderButtons from './HeaderButtons';
import getActiveRouteName from './getActiveRouteName';
import getScreenOptions from './getScreenOptions';
import {navigationRef} from './NavigationService';

const HomeScreen = ({navigation, route}) => {
  navigation.setOptions({
    headerLeft: props => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          console.log('不能再返回了！');
        }}
      />
    ),
    headerRight: () => (
      <HeaderButtons>
        {/* title、iconName、onPress、IconComponent、iconSize、color */}
        <HeaderButtons.Item
          title="添加"
          iconName="plus"
          onPress={() => console.log('点击了添加按钮')}
          iconSize={24}
          color="#ffffff"
        />
      </HeaderButtons>
    ),
  });

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const {author} = route.params || {};
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Text>{author}</Text>
        <Button
          type="warning"
          // 使用 setOptions 更新标题
          onPress={() => navigation.setOptions({headerTitle: 'Updated!'})}>
          Update the title
        </Button>
        <Button
          type="primary"
          onPress={() =>
            // 跳转到指定页面，并传递两个参数
            navigation.navigate('DetailsScreen', {
              otherParam: 'anything you want here',
            })
          }>
          Go to DetailsScreen
        </Button>
        <Button
          type="warning"
          onPress={() => navigation.navigate('SafeAreaViewScreen')}>
          Go SafeAreaViewScreen
        </Button>
        <Button
          type="primary"
          onPress={() =>
            navigation.navigate('CustomAndroidBackButtonBehaviorScreen')
          }>
          Go CustomAndroidBackButtonBehavior
        </Button>
      </View>
    </>
  );
};

const DetailsScreen = ({navigation, route}) => {
  // 通过 props.route.params 接收参数
  const {itemId, otherParam} = route.params;
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <Button
        type="primary"
        // 返回上一页
        onPress={() => navigation.goBack()}>
        Go back
      </Button>
      <Button
        type="primary"
        // 如果返回上一个页面需要传递参数，请使用 navigate 方法
        onPress={() => navigation.navigate('HomeScreen', {author: '杨俊宁'})}>
        Go back with Params
      </Button>
    </View>
  );
};

const SettingsScreen = ({navigation, route}) => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

const SafeAreaViewScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

const CustomAndroidBackButtonBehaviorScreen = ({navigation, route}) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        alert('物理返回键被拦截了！');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text>AndroidBackHandlerScreen</Text>
    </View>
  );
};

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const BottomTabScreen = () => (
  <BottomTab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'HomeScreen') {
          iconName = focused ? 'apple' : 'apple';
          return (
            <IconWithBadge badgeCount={90}>
              <IconOutline name={iconName} size={size} color={color} />
            </IconWithBadge>
          );
        } else if (route.name === 'SettingsScreen') {
          iconName = focused ? 'twitter' : 'twitter';
        }
        return <IconOutline name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{tabBarLabel: '首页'}}
    />
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{tabBarLabel: '设置'}}
    />
  </BottomTab.Navigator>
);
const App = () => {
  const routeNameRef = React.useRef(null);
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            console.log('[onStateChange]', currentRouteName);
            if (currentRouteName === 'HomeScreen') {
              StatusBar.setBarStyle('dark-content'); // 修改 StatusBar
            } else {
              StatusBar.setBarStyle('dark-content'); // 修改 StatusBar
            }
          }
          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          // 页面共享的配置
          screenOptions={getScreenOptions()}>
          <Stack.Screen
            name="BottomTabScreen"
            component={BottomTabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{headerTitle: '详情'}} // headerTitle 用来设置标题栏
            initialParams={{itemId: 42}} // 默认参数
          />
          <Stack.Screen
            name="SafeAreaViewScreen"
            component={SafeAreaViewScreen}
            options={{headerTitle: 'SafeAreaView'}}
          />
          <Stack.Screen
            name="CustomAndroidBackButtonBehaviorScreen"
            component={CustomAndroidBackButtonBehaviorScreen}
            options={{headerTitle: '拦截安卓物理返回键'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
