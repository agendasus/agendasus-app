import * as React from 'react';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import { ROTAS } from './constants';

import * as LocalRepository from './database/Local';

import { AuthProvider } from './AuthContext';

const Stack = createStackNavigator();

const noHeader = { headerShown: false, headerMode: 'none' };

const noHeaderWithBackButton = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'transparent',
  },
  headerTitle: '',
  headerShown: true,
  headerMode: 'none',
};

const config = {
  screens: {
    [ROTAS.resetPassword]: `${ROTAS.resetPassword}/:hash`,
  },
};

const linking = {
  prefixes: ['agendasus://'],
  config,
};

const mountOpenRoutes = () => {
  return (
    <>
      <Stack.Screen
        options={noHeader}
        name={ROTAS.login}
        component={LoginScreen}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROTAS.createAccount}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROTAS.resetPassword}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROTAS.forgotPassword}
        component={ForgotPasswordScreen}
      />
    </>
  );
}

const mountRestrictedRoutes = userData => {
  return (
    <>
      <Stack.Screen
        options={noHeader}
        name={ROTAS.home}
        component={HomeScreen}
        initialParams={userData}
      />
    </>
  );
}

function App() {
  const [hasToken, setHasToken] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        setUserData(data);
        setHasToken(true);
      },
      signOut: async () => {
        setUserData();
        setHasToken(false);
      },
      signUp: async data => {
        setUserData(data);
        setHasToken(true);
      },
    }),
    []
  );

  React.useEffect(() => {
    const getUserToken = async () => {
      const userData = await LocalRepository.getUserData();
      setHasToken(!!userData);
      setUserData(userData);
      setIsLoading(false);
    }
    getUserToken();
  }, []);


  return (
    <AuthProvider value={authContext}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          {isLoading ? (
            <>
              <Stack.Screen options={noHeader} name="Splash" component={SplashScreen} />
              <Stack.Screen
                options={noHeaderWithBackButton}
                name={ROTAS.resetPassword}
                component={ForgotPasswordScreen}
              />
            </>
          ) : hasToken ? mountRestrictedRoutes(userData) : mountOpenRoutes()
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
