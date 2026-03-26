// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient'; // Initialize with your API keys

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserRole(session.user.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserRole(session.user.id);
    });
  }, []);

  async function fetchUserRole(userId) {
    const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
    setRole(data?.role);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session ? (
          // Auth Stack: Includes Landing, Login, and Signup
          <>
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="AdminAuth" component={AdminLoginSignup} />
            <Stack.Screen name="UserAuth" component={UserLoginSignup} />
          </>
        ) : (
          // Protected Stacks
          role === 'admin' ? (
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          ) : (
            <Stack.Screen name="UserDashboard" component={UserDashboard} />
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}