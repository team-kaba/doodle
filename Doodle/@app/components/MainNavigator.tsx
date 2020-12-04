import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {Doodle} from '@app/components/pages';

// テンプレートでは、スタックを利用しています。
// アプリでタブの利用する場合は、ここをcreateBottomTabNavigatorに変更してください。
const main = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <main.Navigator initialRouteName={Doodle.name}>
      <main.Screen name={Doodle.name} component={Doodle.component} options={Doodle.options} />
    </main.Navigator>
  );
};
