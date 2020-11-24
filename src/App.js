import * as React from 'react';
import { LogBox } from 'react-native';

import { ThemeProvider } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import AddAppointmentScreen from './screens/add-appointment/AddAppointmentScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import MedicalRecordScreen from './screens/MedicalRecordScreen';
import MedicationScreen from './screens/MedicationScreen';

import { ROUTES } from './constants';

import * as LocalRepository from './database/Local';

import { AuthProvider } from './contexts/AuthContext';

import Moment from 'moment';
import momentPT from 'moment/locale/pt';
Moment.updateLocale('pt', momentPT);

LogBox.ignoreLogs(['Deprecation warning: use moment.updateLocale']);

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
    [ROUTES.resetPassword]: `${ROUTES.resetPassword}/:hash`,
  },
};

const linking = {
  prefixes: ['http://agendasus.*', 'http://agendasus-auth.*'],
  config,
};

const mountOpenRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={noHeader}
        name={ROUTES.login}
        component={LoginScreen}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROUTES.createAccount}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROUTES.forgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROUTES.resetPassword}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}

const mountRestrictedRoutes = userData => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen
        options={noHeader}
        name={ROUTES.restricted.home}
        component={HomeScreen}
        initialParams={userData}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: 'white',
          },
          headerTitle: 'Agendamentos',
          headerShown: true,
        }}
        name={ROUTES.restricted.appointment}
        component={AppointmentScreen}
        initialParams={userData}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROUTES.restricted.medicalRecord}
        component={MedicalRecordScreen}
        initialParams={userData}
      />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROUTES.restricted.medication}
        component={MedicationScreen}
        initialParams={userData}
      />
      <Stack.Screen
        options={noHeader}
        name={ROUTES.restricted.addAppointment}
        component={AddAppointmentScreen}
        initialParams={userData}
      />

    </Stack.Navigator>
  );
}

const mountOpeningRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={noHeader} name="Splash" component={SplashScreen} />
      <Stack.Screen
        options={noHeaderWithBackButton}
        name={ROUTES.resetPassword}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
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
    <ThemeProvider>
      <AuthProvider value={authContext}>
        <NavigationContainer linking={linking}>
          {isLoading ? (
            mountOpeningRoutes()
          ) : hasToken ? mountRestrictedRoutes(userData) : mountOpenRoutes()
          }
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
