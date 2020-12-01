import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import Doodle from '@app/components/pages/Doodle';

// テンプレートでは、スタックを利用しています。
// アプリでタブの利用する場合は、ここをcreateBottomTabNavigatorに変更してください。
const Main = createNativeStackNavigator();

export function MainNavigator() {
  return (
    <Main.Navigator initialRouteName={Doodle.name}>
      <Main.Screen name={Doodle.name} component={Doodle.component} options={Doodle.options} />
    </Main.Navigator>
  );
}
