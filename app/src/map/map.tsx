import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert, Linking, Platform  } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { LeafletView } from 'react-native-leaflet-view';
import * as Location from 'expo-location';

const Map: React.FC = () => {

  const router = useRouter();
  
  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied, we need your location, please grant us your location');
        
        if (Platform.OS == 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    }
    
    const loadMap = async () => {
      try {
        const path = require("./../../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        Alert.alert('Map', JSON.stringify('Error loading map'), [
          {
            text: 'OK', onPress: () => {
              router.replace('./../login/create-account')
            }
          },
        ]);
        console.error('Error loading map:', error);
      }
    };

    getCurrentLocation();
    loadMap();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!webViewContent) {
    return <ActivityIndicator size="large" />
  }
    return (
      <>
        <LeafletView
          source={{ html: webViewContent }}
          mapCenterPosition={{
            lat: location?.coords.latitude,
            lng: location?.coords.longitude,
          }}
        />
      </>
    );
  }

  const styles = StyleSheet.create({
    button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: '#fff',
    },
  });
  
  export default Map;