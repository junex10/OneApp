import { Stack } from 'expo-router';

const LOGIN = 'src/login/';
const MAP = 'src/map/';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />

            {/* Login */}
            <Stack.Screen name={`${LOGIN}login`} options={{ title: 'Login', headerShown: true }}  />
            <Stack.Screen name={`${LOGIN}create-account`} options={{ title: 'CreateAccount', headerShown: true }}  />

            { /** MAP */}

            <Stack.Screen name={`${MAP}map`} options={{ title: 'Map', headerShown: false }}  />

        </Stack>
    )
}